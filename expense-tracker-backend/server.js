import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import expenseRouter from "./routes/expense.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/expenses", expenseRouter);

if ((process.env.NODE_ENV || "").trim() === "production") {
  app.use(
    express.static(path.join(__dirname, "/expense-tracker-frontend/dist"))
  );
  app.get("*name", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "expense-tracker-frontend", "dist", "index.html")
    );
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at localhost:${PORT}`);
});
