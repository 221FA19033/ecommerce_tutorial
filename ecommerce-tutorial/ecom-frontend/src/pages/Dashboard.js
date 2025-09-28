// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function Dashboard() {
  const [view, setView] = useState("products");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cart, setCart] = useState([]);

  // Product editing
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  // Customer editing
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load data
  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const fetchCustomers = () => {
    axios
      .get("http://127.0.0.1:8000/api/customers/")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  };

  // ---------------- PRODUCTS ----------------
  const handleProductEdit = (product) => {
    setEditingProduct(product.id);
    setProductForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
  };

  const handleProductUpdate = () => {
    axios
      .put(
        `http://127.0.0.1:8000/api/products/${editingProduct}/`,
        productForm
      )
      .then(() => {
        fetchProducts();
        setEditingProduct(null);
        setProductForm({ name: "", price: "", stock: "", description: "" });
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  const handleProductDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/products/${id}/delete/`)
        .then(() => setProducts(products.filter((p) => p.id !== id)))
        .catch((err) => console.error("Error deleting product:", err));
    }
  };

  // ---------------- CUSTOMERS ----------------
  const handleCustomerEdit = (customer) => {
    setEditingCustomer(customer.id);
    setCustomerForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
  };

  const handleCustomerUpdate = () => {
    axios
      .put(
        `http://127.0.0.1:8000/api/customers/${editingCustomer}/`,
        customerForm
      )
      .then(() => {
        fetchCustomers();
        setEditingCustomer(null);
        setCustomerForm({ name: "", email: "", phone: "" });
      })
      .catch((err) => console.error("Error updating customer:", err));
  };

  const handleCustomerDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/customers/${id}/delete/`)
        .then(() => setCustomers(customers.filter((c) => c.id !== id)))
        .catch((err) => console.error("Error deleting customer:", err));
    }
  };

  // ---------------- CART ----------------
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert("✅ Product added to cart successfully!");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📊 Dashboard</h1>

      {/* Dashboard Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`custom-btn products-btn mx-2 ${
            view === "products" ? "active-btn" : ""
          }`}
          onClick={() => setView("products")}
        >
          Products
        </button>
        <button
          className={`custom-btn customers-btn mx-2 ${
            view === "customers" ? "active-btn" : ""
          }`}
          onClick={() => setView("customers")}
        >
          Customers
        </button>
        <button
          className={`custom-btn cart-btn mx-2 ${
            view === "cart" ? "active-btn" : ""
          }`}
          onClick={() => setView("cart")}
        >
          Cart 🛒 ({cart.length})
        </button>
      </div>

      {/* ---------------- PRODUCTS ---------------- */}
      {view === "products" && (
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="mb-3">📦 Products</h2>
          <table className="table table-hover table-striped">
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
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    {editingProduct === p.id ? (
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.name
                    )}
                  </td>
                  <td>
                    {editingProduct === p.id ? (
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.price
                    )}
                  </td>
                  <td>
                    {editingProduct === p.id ? (
                      <input
                        type="number"
                        value={productForm.stock}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            stock: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.stock
                    )}
                  </td>
                  <td>
                    {editingProduct === p.id ? (
                      <input
                        type="text"
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.description
                    )}
                  </td>
                  <td>
                    {editingProduct === p.id ? (
                      <>
                        <button
                          className="custom-btn save-btn me-2"
                          onClick={handleProductUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="custom-btn cancel-btn"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="custom-btn edit-btn me-2"
                          onClick={() => handleProductEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="custom-btn delete-btn me-2"
                          onClick={() => handleProductDelete(p.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="custom-btn addcart-btn"
                          onClick={() => handleAddToCart(p)}
                        >
                          Add to Cart
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------------- CUSTOMERS ---------------- */}
      {view === "customers" && (
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="mb-3">👥 Customers</h2>
          <table className="table table-hover table-striped">
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
                    {editingCustomer === c.id ? (
                      <input
                        type="text"
                        value={customerForm.name}
                        onChange={(e) =>
                          setCustomerForm({
                            ...customerForm,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      c.name
                    )}
                  </td>
                  <td>
                    {editingCustomer === c.id ? (
                      <input
                        type="email"
                        value={customerForm.email}
                        onChange={(e) =>
                          setCustomerForm({
                            ...customerForm,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      c.email
                    )}
                  </td>
                  <td>
                    {editingCustomer === c.id ? (
                      <input
                        type="text"
                        value={customerForm.phone}
                        onChange={(e) =>
                          setCustomerForm({
                            ...customerForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      c.phone
                    )}
                  </td>
                  <td>
                    {editingCustomer === c.id ? (
                      <>
                        <button
                          className="custom-btn save-btn me-2"
                          onClick={handleCustomerUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="custom-btn cancel-btn"
                          onClick={() => setEditingCustomer(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="custom-btn edit-btn me-2"
                          onClick={() => handleCustomerEdit(c)}
                        >
                          Edit
                        </button>
                        <button
                          className="custom-btn delete-btn"
                          onClick={() => handleCustomerDelete(c.id)}
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
      )}

      {/* ---------------- CART ---------------- */}
      {view === "cart" && (
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="mb-3">🛒 Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
