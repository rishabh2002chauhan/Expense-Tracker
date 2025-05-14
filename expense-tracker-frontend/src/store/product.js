import { create } from "zustand";

export const useProductStore = create((set) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),
  createExpense: async (newExpense) => {
    if (
      !newExpense.ID ||
      !newExpense.Amount ||
      !newExpense.Category ||
      !newExpense.Description ||
      !newExpense.Date
    ) {
      return { success: false, message: "Expense not created" };
    }

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    });

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: "Expense not created" };
    }
    set((state) => ({ expenses: [...state.expenses, data.data] }));
    return { success: true, message: "Expense created" };
  },
  fetchExpenses: async () => {
    const res = await fetch("/api/expenses");
    const data = await res.json();
    set({ expenses: data.data });
    return { success: true, message: "Expenses fetched" };
  },
  deleteExpense: async (id) => {
    const res = await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success == false) {
      return { success: false, message: "Expense not deleted" };
    }
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense._id !== id),
    }));
    return { success: true, message: "Expense deleted" };
  },
  updateExpense: async (newExpense, id) => {
    if (
      !newExpense.ID ||
      !newExpense.Amount ||
      !newExpense.Category ||
      !newExpense.Description ||
      !newExpense.Date
    ) {
      return { success: false, message: "Expense not created" };
    }

    const res = await fetch(`/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    });

    const data = await res.json();
    if (data.success == false) {
      return { success: false, message: "Expense not updated" };
    }
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense._id === id ? data.data : expense
      ),
    }));
    return { success: true, message: "Expense updated" };
  },
}));
