import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Authorization Header Token:", token);

  if (!token) {
    console.log("Authorization Header Token is missing");
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
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