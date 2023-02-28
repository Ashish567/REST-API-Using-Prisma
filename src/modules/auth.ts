import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// return promise
export const comparePasswords = (password, hash) => {
  console.log(password, hash);
  return bcrypt.compare(password, hash);
};
// return promise
export const hashPassword = (password) => {
  console.log("password : " + password);
  const hd = bcrypt.hash(password, 5);
  console.log(hd);
  return hd;
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "not token" });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "not valid token" });
  }
};
