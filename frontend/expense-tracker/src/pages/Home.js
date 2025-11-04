import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { userId, setUserId, userEmail, token } = useContext(AuthContext);
  const [tempId, setTempId] = useState(userId || "");
  const navigate = useNavigate();

  const saveUserId = () => {
    if (!tempId) return alert("Enter your user id (numeric) to proceed");
    setUserId(tempId);
    alert("User id saved. You can now use user-specific endpoints.");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card p-3 mb-3">
        <p>
          Welcome <strong>{userEmail || "User"}</strong> — JWT active: <strong>{token ? "Yes" : "No"}</strong>
        </p>
        <p>
          This app expects that backend endpoints for categories/expenses/budgets use your numeric user id in the path (for example: <code>/api/categories/user/1</code>).
        </p>
        <div className="mb-2">
          <label>Enter your numeric User ID (required for API calls):</label>
          <input className="form-control" value={tempId} onChange={(e) => setTempId(e.target.value)} placeholder="e.g. 1" disabled/>
        </div>
        <div>
          <button className="btn btn-primary me-2" onClick={saveUserId}>
            Save User ID
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate("/categories")}>
            Manage Categories
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/expenses">Expenses</a></li>
              <li><a href="/budgets">Budgets</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Notes</h5>
            <p>Make sure to save your numeric user id above so the app can call user-specific endpoints on your backend.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
