import mongoose from "mongoose";
import Expenses from "../models/expenses.model.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find({});
    res.status(200).json({ success: true, data: expenses });
    console.log("Expenses fetched.");
  } catch (error) {
    console.error("Error in fetching expenses");
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export const createExpense = async (req, res) => {
  const expense = req.body;

  if (
    !expense.ID ||
    !expense.Amount ||
    !expense.Description ||
    !expense.Category ||
    !expense.Date
  ) {
    console.error("Error in creating expense");
    return res
      .status(400)
      .json({ success: "false", message: "Please input all fields" });
  }

  const newExpense = new Expenses(expense);

  try {
    await newExpense.save();
    res.status(201).json({ success: true, data: newExpense });
    console.log("New expense created.");
  } catch (error) {
    console.error("Error in creating expense: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await Expenses.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: `Expense with id:${id} deleted.` });
  } catch (error) {
    console.error("Error in deleting expense: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid expense _id" });
  }

  try {
    const updatedExpense = await Expenses.findByIdAndUpdate(id, expense, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedExpense,
      message: "Expense updated",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
