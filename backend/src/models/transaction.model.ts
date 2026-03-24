import mongoose from "mongoose";

export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "food"
  | "transport"
  | "salary"
  | "entertainment"
  | "other";

interface ITransaction extends mongoose.Document {
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: Date;
  user: mongoose.Types.ObjectId;
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    description: { type: String, required: true, trim: true },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: {
      type: String,
      enum: ["food", "transport", "salary", "entertainment", "other"],
      required: true,
    },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

// index for faster user-specific queries
transactionSchema.index({ user: 1, date: -1 });

const TransactionModel = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema,
);

export default TransactionModel;
