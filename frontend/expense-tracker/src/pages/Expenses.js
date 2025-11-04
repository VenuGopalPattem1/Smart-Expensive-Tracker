import React, { useContext, useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: "", description: "", paymentMethod: "CASH", date: "" });
  const [editing, setEditing] = useState(null);
const { userId } = useContext(AuthContext);

 // ✅ Fetch budgets whenever userId changes and is available
  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId]);
  const fetchExpenses = async () => {
    const res = await api.get(`/expenses/user/${userId}`);
    setExpenses(res.data);
  };

  const addExpense = async () => {
    await api.post(`/expenses/user/${userId}/category/1`, form);
    setForm({ amount: "", description: "", paymentMethod: "CASH", date: "" });
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  const updateExpense = async (id) => {
    await api.put(`/expenses/${id}`, form);
    setEditing(null);
    fetchExpenses();
  };

  return (
    <div className="container mt-4">
      <h3>Expenses</h3>

      <div className="card p-3 mb-4">
        <h5>{editing ? "Edit Expense" : "Add Expense"}</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
            >
              <option value="CASH">CASH</option>
              <option value="CREDIT_CARD">CREDIT CARD</option>
              <option value="CREDIT_CARD">CREDIT CARD</option>
              <option value="DEBIT_CARD">DEBIT CARD</option>
              <option value="WALLET">WALLET</option>
              <option value="BANK_TRANSFER">BANK TRANSFER</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-3">
          {editing ? (
            <button className="btn btn-primary" onClick={() => updateExpense(editing)}>Update</button>
          ) : (
            <button className="btn btn-success" onClick={addExpense}>Add</button>
          )}
        </div>
      </div>

      <ul className="list-group">
        {expenses.map((exp) => (
          <li key={exp.id} className="list-group-item d-flex justify-content-between align-items-center">
            ₹{exp.amount} - {exp.description} ({exp.paymentMethod})
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => {
                  setEditing(exp.id);
                  setForm({
                    amount: exp.amount,
                    description: exp.description,
                    paymentMethod: exp.paymentMethod,
                    date: exp.date,
                  });
                }}
              >Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteExpense(exp.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
