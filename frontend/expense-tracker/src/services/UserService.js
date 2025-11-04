import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

const getAllUsers = (token) => {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

const getUserById = (id, token) => {
  return axios.get(`${API_URL}${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export default { getAllUsers, getUserById };
