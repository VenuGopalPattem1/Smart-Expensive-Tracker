import React, { useContext, useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ limitAmount: "", startDate: "", endDate: "" });
  const [editing, setEditing] = useState(null);
  const { userId } = useContext(AuthContext);

 // ✅ Fetch budgets whenever userId changes and is available
  useEffect(() => {
    if (userId) {
      fetchBudgets();
    }
  }, [userId]);

  const fetchBudgets = async () => {
    const res = await api.get(`/budgets/user/${userId}`);
    setBudgets(res.data);
  };

  const addBudget = async () => {
    await api.post(`/budgets/user/${userId}/category/1`, form);
    setForm({ limitAmount: "", startDate: "", endDate: "" });
    fetchBudgets();
  };

  const deleteBudget = async (id) => {
    await api.delete(`/budgets/${id}`);
    fetchBudgets();
  };

  const updateBudget = async (id) => {
    await api.put(`/budgets/${id}`, form);
    setEditing(null);
    fetchBudgets();
  };

  return (
    <div className="container mt-4">
      <h3>Budgets</h3>
      <div className="card p-3 mb-4">
        <h5>{editing ? "Edit Budget" : "Add Budget"}</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Limit Amount"
              value={form.limitAmount}
              onChange={(e) => setForm({ ...form, limitAmount: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-3">
          {editing ? (
            <button className="btn btn-primary" onClick={() => updateBudget(editing)}>Update</button>
          ) : (
            <button className="btn btn-success" onClick={addBudget}>Add</button>
          )}
        </div>
      </div>

      <ul className="list-group">
        {budgets.map((b) => (
          <li key={b.id} className="list-group-item d-flex justify-content-between">
            ₹{b.limitAmount} (From: {b.startDate} To: {b.endDate})
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => {
                  setEditing(b.id);
                  setForm({
                    limitAmount: b.limitAmount,
                    startDate: b.startDate,
                    endDate: b.endDate,
                  });
                }}
              >Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteBudget(b.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budgets;
