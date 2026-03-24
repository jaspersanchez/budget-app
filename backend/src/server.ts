import "dotenv/config";
import express from "express";
import cors from "cors";

import { logger } from "./middleware/logger.middleware";
import { env } from "./utils/env";
import connectDB from "./db";
import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";

const port = env.port || 4000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

(async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
})();
