
import jwt from "jsonwebtoken";



export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;


  // Check if token is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(' ')[1];

  try {

    const decoded = jwt.verify(token,process.env.JWTSIGNATURE);
    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};


