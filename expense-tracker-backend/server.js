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

console.log("node env is " + process.env.NODE_ENV + "mode");
console.log(path.join(__dirname, "/expense-tracker-frontend/dist"));
if ((process.env.NODE_ENV || "").trim() === "production") {
  console.log("production mode");
  app.use(
    express.static(path.join(__dirname, "/expense-tracker-frontend/dist"))
  );
  app.get("*name", (req, res) => {
    try {
      res.sendFile(
        path.resolve(
          __dirname,
          "expense-tracker-frontend",
          "dist",
          "index.html"
        )
      );
      console.log("index.html file sent");
    } catch (error) {
      console.log("error in sending file", error);
    }
  });
} else {
  console.log("development mode");
}

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at localhost:${PORT}`);
});
