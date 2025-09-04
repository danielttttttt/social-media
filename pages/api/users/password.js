import { getUsersStore, setUsersStore } from '../_data/users';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
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

    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Current and new password are required' });
    }

    const users = getUsersStore();
    let userIndex = users.findIndex(u => u.id === decoded.userId);
    if (userIndex === -1 && decoded.email) {
      userIndex = users.findIndex(u => u.email === decoded.email);
    }
    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const current = users[userIndex];
    if (current.password !== currentPassword) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    }

    users[userIndex] = { ...current, password: newPassword };
    setUsersStore(users);

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(400).json({ success: false, error: 'Invalid token' });
  }
}

