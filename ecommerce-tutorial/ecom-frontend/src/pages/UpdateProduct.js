import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct(){
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", price: "", stock: "", description: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("products/")
      .then(res => {
        const p = res.data.find(item => item.id === parseInt(id));
        if (p) {
          setForm({ name: p.name, price: p.price, stock: p.stock, description: p.description });
        } else {
          alert("Product not found");
          navigate("/products");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load product");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`products/update/${id}/`, {
        name: form.name,
        price: parseFloat(form.price || 0),
        stock: parseInt(form.stock || 0),
        description: form.description
      });
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Update Product</h1>
      <div className="card" style={{maxWidth:720}}>
        <form onSubmit={handleSubmit}>
          <input name="name" className="form-input" placeholder="Product name" value={form.name} onChange={handleChange} required />
          <input name="price" className="form-input" placeholder="Price" value={form.price} onChange={handleChange} type="number" step="0.01" required />
          <input name="stock" className="form-input" placeholder="Stock" value={form.stock} onChange={handleChange} type="number" required />
          <textarea name="description" className="form-input" placeholder="Description" value={form.description} onChange={handleChange} rows="4" />
          <div className="hstack">
            <button className="btn" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
