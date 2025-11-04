import axios from "./axiosInstance";

const BASE = "/categories";

const getAllCategories = (userId) => {
  return axios.get(`${BASE}/user/${userId}`);
};

const createCategory = (userId, category) => {
  return axios.post(`${BASE}/user/${userId}`, category);
};

export default { getAllCategories, createCategory };
