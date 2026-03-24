import { RequestHandler } from "express";
import UserModel from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  const user = await UserModel.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id.toString()),
  });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).json({ error: "Invalid username or password" });
    return;
  }

  const validPassword = await user.matchPassword(password);

  if (!validPassword) {
    res.status(400).json({ error: "Invalid username or password" });
    return;
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id.toString()),
  });
};
