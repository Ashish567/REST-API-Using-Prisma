import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// coparing passwords
export const comparePasswords = (password, hash) =>
  bcrypt.compare(password, hash);

// auto-gen a salt and hash
export const hashPassword = (password) =>
  bcrypt.hash(password, process.env.SALT_ROUNDS);

// creating jwt
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.COOKIE_EXPIRATION }
  );
  return token;
};

// Middleware function to protect routes
export const protect = (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "not valid token", err });
  }
};
