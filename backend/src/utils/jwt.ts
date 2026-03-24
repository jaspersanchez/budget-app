import jwt from "jsonwebtoken";
import { env } from "./env";

const jwtSecret = env.jwtSecret;

export const generateToken = (val: string) =>
  jwt.sign({ val }, jwtSecret, { expiresIn: "7d" });

export const verifyToken = (token: string) => jwt.verify(token, jwtSecret);
