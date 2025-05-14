import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", getExpenses);

router.post("/", createExpense);

router.delete("/:id", deleteExpense);

router.put("/:id", updateExpense);

export default router;
