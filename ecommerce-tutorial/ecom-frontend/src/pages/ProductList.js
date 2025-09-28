import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList({ cart, toggleCart, removeFromCart }) {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = "2fd4e2b4763ffd2ebc280a2af8fffec467a2be3d";

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/", {
        headers: { Authorization: `Token ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEdit = (p) => {
    setEditingId(p.id);
    setFormData({ name: p.name, price: p.price, stock: p.stock, description: p.description });
  };

  const saveEdit = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/products/${editingId}/`,
        formData,
        { headers: { Authorization: `Token ${token}` } }
      );
      setProducts(products.map((p) => (p.id === editingId ? response.data : p)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      removeFromCart(id); // remove from cart if present
    } catch (err) {
      console.error(err);
      setError("Failed to delete product");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="mt-4">
      <h2>Products</h2>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{editingId === p.id ? <input className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /> : p.name}</td>
                <td>{editingId === p.id ? <input type="number" className="form-control" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} /> : p.price}</td>
                <td>{editingId === p.id ? <input type="number" className="form-control" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} /> : p.stock}</td>
                <td>{editingId === p.id ? <input className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /> : p.description}</td>
                <td>
                  {editingId === p.id ? (
                    <>
                      <button className="btn btn-warning btn-sm me-2" onClick={saveEdit}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(p)}>Edit</button>
                      <button className="btn btn-danger btn-sm me-2" onClick={() => deleteProduct(p.id)}>Delete</button>
                      <button
                        className={`btn btn-sm ${cart.find((item) => item.id === p.id) ? "btn-danger" : "btn-primary"}`}
                        onClick={() => toggleCart(p)}
                      >
                        {cart.find((item) => item.id === p.id) ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
