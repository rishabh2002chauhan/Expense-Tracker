import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema(
  {
    ID: {
      type: Number,
      required: true,
      unique: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expenses = mongoose.model("Expense", expensesSchema);

export default Expenses;
