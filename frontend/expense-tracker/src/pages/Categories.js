import React, { useContext, useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState("");

 const { userId } = useContext(AuthContext);
 
  // ✅ Fetch budgets whenever userId changes and is available
   useEffect(() => {
     if (userId) {
       fetchCategories();
     }
   }, [userId]);

  const fetchCategories = async () => {
    const res = await api.get(`/categories/user/${userId}`);
    setCategories(res.data);
  };

  const addCategory = async () => {
    await api.post(`/categories/user/${userId}`, { name: newCategory });
    setNewCategory("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  const updateCategory = async (id) => {
    await api.put(`/categories/${id}`, { name: editName });
    setEditing(null);
    fetchCategories();
  };

  return (
    <div className="container mt-4">
      <h3>Categories</h3>
      <div className="mb-3 d-flex">
        <input
          className="form-control me-2"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
        />
        <button className="btn btn-success" onClick={addCategory}>Add</button>
      </div>

      <ul className="list-group">
        {categories.map((cat) => (
          <li key={cat.id} className="list-group-item d-flex justify-content-between">
            {editing === cat.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="form-control me-2"
                />
                <button className="btn btn-primary me-2" onClick={() => updateCategory(cat.id)}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
              </>
            ) : (
              <>
                {cat.name}
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => { setEditing(cat.id); setEditName(cat.name); }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteCategory(cat.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
