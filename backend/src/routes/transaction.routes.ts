import express from "express";
import { protect } from "../middleware/auth.middleware";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getSummary,
  getByCategory,
} from "../controllers/transaction.controllers";

const router = express.Router();

router.use(protect);

router.get("/summary", getSummary);
router.get("/category", getByCategory);
router.get("/", getTransactions);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;
