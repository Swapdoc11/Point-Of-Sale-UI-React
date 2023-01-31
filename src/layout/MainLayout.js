import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ children }) => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <Link to="/" className="nav-link">
              Central POS
            </Link>
            <Link to="/addproduct" className="nav-link">Add Product</Link>
          </div>
        </nav>
      </header>
      <main>
        <div className="container mt-3">{children}</div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
