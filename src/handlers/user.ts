import prisma from "../db";

import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      userName: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.username,
    },
  });
  console.log(user);
  const isValid = await comparePasswords(req.body.password, user.password);
  console.log(isValid);
  if (!isValid) {
    res.status(401).json({
      message: "nope",
    });
    return;
  }
  const token = createJWT(user);
  return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });
};
