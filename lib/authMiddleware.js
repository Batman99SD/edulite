import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check for Admin Role
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Forbidden: Admins only' });
    // }

    next();
  } catch (error) {
    console.error('Token Error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
}