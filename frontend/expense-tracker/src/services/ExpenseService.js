import axios from "./axiosInstance";

const BASE = "/expenses";

const getUserExpenses = (userId) => {
  return axios.get(`${BASE}/user/${userId}`);
};

const createExpense = (userId, categoryId, expense) => {
  // categoryId should be path variable — if categoryId is falsy pass 0 (backend handles optional)
  const catId = categoryId || 0;
  return axios.post(`${BASE}/user/${userId}/category/${catId}`, expense);
};

export default { getUserExpenses, createExpense };
