// Simple in-memory storage for demo purposes
// In production, this would use a real database
let users = [
  {
    id: 1,
    username: 'demo',
    email: 'demo@campus.edu',
    password: 'password123', // In production, this would be hashed
    name: 'Demo User',
    profilePic: 'https://i.pravatar.cc/150?u=demo@campus.edu'
  }
];

let nextUserId = 2;

// Helper to find user by email or username
const findUser = (emailOrUsername) => {
  return users.find(user => 
    user.email === emailOrUsername || user.username === emailOrUsername
  );
};

// Helper to generate a simple JWT-like token (for demo only)
const generateToken = (user) => {
  return Buffer.from(JSON.stringify({ 
    userId: user.id, 
    email: user.email,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  })).toString('base64');
};

// Helper to verify token
const verifyToken = (token) => {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    if (decoded.exp < Date.now()) {
      return null; // Token expired
    }
    return decoded;
  } catch {
    return null;
  }
};

export default function handler(req, res) {
  const { method } = req;
  const pathParts = req.query.auth || [];
  const endpoint = pathParts.join('/');

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  switch (endpoint) {
    case 'login':
      if (method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({
            success: false,
            error: 'Email and password are required'
          });
        }

        const user = findUser(email);
        if (!user || user.password !== password) {
          return res.status(400).json({
            success: false,
            error: 'Invalid credentials'
          });
        }

        const token = generateToken(user);
        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
          success: true,
          user: userWithoutPassword,
          token
        });
      }
      break;

    case 'register':
      if (method === 'POST') {
        const { username, email, password, firstName, lastName } = req.body;

        if (!username || !email || !password) {
          return res.status(400).json({
            success: false,
            error: 'Username, email, and password are required'
          });
        }

        // Check if user already exists
        if (findUser(email) || findUser(username)) {
          return res.status(400).json({
            success: false,
            error: 'User with this email or username already exists'
          });
        }

        // Create new user
        const newUser = {
          id: nextUserId++,
          username,
          email,
          password, // In production, hash this
          name: firstName && lastName ? `${firstName} ${lastName}` : username,
          profilePic: `https://i.pravatar.cc/150?u=${email}`
        };

        users.push(newUser);

        const token = generateToken(newUser);
        const { password: _, ...userWithoutPassword } = newUser;

        return res.status(201).json({
          success: true,
          user: userWithoutPassword,
          token
        });
      }
      break;

    case 'logout':
      if (method === 'POST') {
        // In a real implementation, you'd invalidate the token
        return res.status(200).json({
          success: true,
          message: 'Logged out successfully'
        });
      }
      break;

    case 'me':
      if (method === 'GET') {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
          return res.status(401).json({
            success: false,
            error: 'Authentication required'
          });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
          return res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
          });
        }

        const user = users.find(u => u.id === decoded.userId);
        if (!user) {
          return res.status(401).json({
            success: false,
            error: 'User not found'
          });
        }

        const { password: _, ...userWithoutPassword } = user;
        return res.status(200).json({
          success: true,
          user: userWithoutPassword
        });
      }
      break;

    default:
      return res.status(404).json({
        success: false,
        error: 'Endpoint not found'
      });
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}