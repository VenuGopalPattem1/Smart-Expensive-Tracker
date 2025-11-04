import axios from "./axiosInstance";

const BASE = "/budgets";

const getUserBudgets = (userId) => {
  return axios.get(`${BASE}/user/${userId}`);
};

const createBudget = (userId, categoryId, budget) => {
  const catId = categoryId || 0;
  return axios.post(`${BASE}/user/${userId}/category/${catId}`, budget);
};

export default { getUserBudgets, createBudget };
