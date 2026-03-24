import bcrypt from "bcrypt";

export const hashValue = (val: string) => bcrypt.hash(val, 10);

export const compareValue = (val: string, hashedValue: string) =>
  bcrypt.compare(val, hashedValue);
