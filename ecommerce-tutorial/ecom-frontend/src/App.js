import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/TopNav";
import ProductList from "./pages/ProductList";
import CustomerList from "./pages/CustomerList";
import CartList from "./pages/CartList";

function App() {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const [cart, setCart] = useState([]);

  // Toggle add/remove in cart
  const toggleCart = (product) => {
    if (cart.find((p) => p.id === product.id)) {
      setCart(cart.filter((p) => p.id !== product.id));
    } else {
      setCart([...cart, product]);
    }
  };

  // Explicit remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((p) => p.id !== productId));
  };

  return (
    <Router>
      {window.location.pathname !== "/" && loggedIn && <Navbar />}

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route
            path="/dashboard"
            element={loggedIn ? <Dashboard /> : <Navigate to="/" />}
          />

          <Route
            path="/products"
            element={
              loggedIn ? (
                <ProductList
                  cart={cart}
                  toggleCart={toggleCart}
                  removeFromCart={removeFromCart}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/customers"
            element={loggedIn ? <CustomerList /> : <Navigate to="/" />}
          />

          <Route
            path="/cart"
            element={
              loggedIn ? (
                <CartList cart={cart} removeFromCart={removeFromCart} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="*"
            element={loggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
