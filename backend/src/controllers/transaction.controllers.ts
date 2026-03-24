import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import TransactionModel from "../models/transaction.model";

export const getTransactions = async (req: AuthRequest, res: Response) => {
  const user = req.user!;

  const transactions = await TransactionModel.find({ user: user._id }).sort({
    date: -1,
  });

  res.json(transactions);
};

export const createTransaction = async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const { description, amount, type, category, date } = req.body;

  if (!description || !amount || !type || !category) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const transaction = await TransactionModel.create({
    description,
    amount,
    type,
    category,
    date: date || Date.now(),
    user: user?._id,
  });

  res.status(201).json(transaction);
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const transaction = await TransactionModel.findById(req.params.id);

  if (!transaction) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  // check if transaction is owned by the user request
  if (transaction.user !== user?._id) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  await transaction.deleteOne();
  res.status(404).json({ message: "Deleted" });
};

export const getSummary = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const result = await TransactionModel.aggregate([
    // get transactions of user
    {
      $match: { user: user?._id },
    },
    // group by type and sum the amounts
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const income = result.find((r) => r._id === "income").total ?? 0;
  const expense = result.find((r) => r._id === "expense").total ?? 0;

  res.json({
    income,
    expense,
    balance: income - expense,
  });
};

export const getByCategory = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const result = await TransactionModel.aggregate([
    {
      $match: { user: user?._id },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);

  res.json(result);
};
