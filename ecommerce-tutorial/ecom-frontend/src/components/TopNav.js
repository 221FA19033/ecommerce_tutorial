// src/components/TopNav.js
import React from "react";
import { NavLink } from "react-router-dom";

function TopNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
        
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
           
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
      
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
