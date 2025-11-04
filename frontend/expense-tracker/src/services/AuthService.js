import axios from "./axiosInstance";

const BASE = "/auth";

const login = async (emailOrUsername, password) => {
  try {
    // backend expects { username, password }
    const payload = { username: emailOrUsername, password };
    const res = await axios.post(`${BASE}/login`, payload);
    const data = res.data;

    // backend returns { token, id }
    if (data.token && data.id) {
      return { token: data.token, id: data.id };
    }

    // fallback if backend returns token in other format
    if (typeof data === "string") return { token: data };
    if (data?.accessToken) return { token: data.accessToken };

    return { message: "Unexpected login response", raw: data };
  } catch (err) {
    return { message: err.response?.data?.message || err.message || "Login error" };
  }
};


const register = async (name, email, password) => {
  try {
    const res = await axios.post(`${BASE}/register`, { username: name, name, email, password });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message || "Registration failed" };
  }
};

export default { login, register };
