import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(emailOrUsername, password);
      if (res.success) {
        navigate("/"); // redirect to home after successful login
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login error");
    }
  };

  return (
    <div className="card card-centered shadow-sm p-4">
      <h3 className="text-center mb-3">Login</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email or Username</label>
          <input
            type="text"
            className="form-control"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
