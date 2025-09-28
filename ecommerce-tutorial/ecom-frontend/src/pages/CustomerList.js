// src/pages/CustomerList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

useEffect(() => {
  const token = "YOUR_TOKEN_HERE"; // ← Paste the token you got from Postman

  axios.get("http://127.0.0.1:8000/api/customers/", {
    headers: {
      Authorization: `Token ${token}`
    }
  })
  .then(response => setCustomers(response.data))
  .catch(error => console.log(error));
}, []);


  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/customers/");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  // 🔹 Delete customer
  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/customers/${id}/`);
        fetchCustomers(); // refresh list
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
    }
  };

  // 🔹 Start editing
  const startEdit = (customer) => {
    setEditingId(customer.id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
  };

  // 🔹 Save update (PUT)
  const saveEdit = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/customers/${editingId}/`,
        formData
      );
      fetchCustomers();
      setEditingId(null);
      setFormData({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Customers</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                {editingId === c.id ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                ) : (
                  c.name
                )}
              </td>
              <td>
                {editingId === c.id ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                ) : (
                  c.email
                )}
              </td>
              <td>
                {editingId === c.id ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                ) : (
                  c.phone
                )}
              </td>
              <td>
                {editingId === c.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => startEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCustomer(c.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
