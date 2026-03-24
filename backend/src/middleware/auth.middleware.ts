import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import UserModel, { IUser } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  // check if header starts with "Bearer: "
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const token = authHeader.split(" ")[1]!;

  try {
    // verify token
    const decoded = verifyToken(token) as { val: string };

    // check if valid user
    const user = await UserModel.findOne({ _id: decoded.val });

    if (!user) {
      res.status(401).json({ error: "Not authorized" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
