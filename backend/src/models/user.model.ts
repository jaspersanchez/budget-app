import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  matchPassword: (entered: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, min: 1, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, min: 8, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const hashed = await hashValue(this.password);
  this.password = hashed;
});

userSchema.methods.matchPassword = async function (
  this: IUser,
  entered: string,
) {
  return compareValue(entered, this.password);
};

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
