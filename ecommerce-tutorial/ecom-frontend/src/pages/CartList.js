import React from "react";

function CartList({ cart, removeFromCart }) {
  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="mt-4">
      <h2>Cart</h2>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(p.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartList;
