export interface IUser {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "salary"
  | "food"
  | "transport"
  | "entertainment"
  | "utilities"
  | "other";

export interface ITranscation {
  _id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  createdAt: string;
}

export interface ISummary {
  income: number;
  expense: number;
  balance: number;
}

export interface ICategoryData {
  _id: string;
  total: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  token: string;
}
