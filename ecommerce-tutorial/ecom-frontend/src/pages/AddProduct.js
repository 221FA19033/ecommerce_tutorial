import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function AddProduct({ product, onAdd, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
      });
    }
  }, [product]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        // Edit existing product
        await axios.put(`http://127.0.0.1:8000/api/products/${product.id}/update/`, form);
        alert("Product updated successfully!");
      } else {
        // Add new product
        await axios.post("http://127.0.0.1:8000/api/products/add/", form);
        alert("Product added successfully!");
      }
      onAdd(); // refresh table and go back
    } catch (err) {
      alert("Error saving product!");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary me-2">
          {product ? "Update Product" : "Add Product"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
