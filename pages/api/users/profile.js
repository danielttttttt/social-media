import { getUsersStore, setUsersStore } from '../_data/users';

export default function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    if (decoded.exp < Date.now()) {
      return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }

    const { name, profilePic, bio, phone, username, email, privacy, prefs } = req.body || {};
    const users = getUsersStore();
    let userIndex = users.findIndex(u => u.id === decoded.userId);
    if (userIndex === -1 && decoded.email) {
      userIndex = users.findIndex(u => u.email === decoded.email);
    }
    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const current = users[userIndex];

    // Uniqueness check for username if changed
    if (username && username !== current.username) {
      const exists = users.some(u => u.username === username);
      if (exists) {
        return res.status(400).json({ success: false, error: 'Username already taken' });
      }
    }

    const updated = {
      ...current,
      ...(name !== undefined ? { name } : {}),
      ...(profilePic !== undefined ? { profilePic } : {}),
      ...(bio !== undefined ? { bio } : {}),
      ...(phone !== undefined ? { phone } : {}),
      ...(username !== undefined ? { username } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(privacy !== undefined ? { privacy: { ...current.privacy, ...privacy } } : {}),
      ...(prefs !== undefined ? { prefs: { ...current.prefs, ...prefs, notifications: { ...current.prefs?.notifications, ...prefs?.notifications } } } : {}),
    };

    users[userIndex] = updated;
    setUsersStore(users);

    const { password: _, ...safeUser } = updated;
    return res.status(200).json({ success: true, user: safeUser });
  } catch (e) {
    return res.status(400).json({ success: false, error: 'Invalid token' });
  }
}

