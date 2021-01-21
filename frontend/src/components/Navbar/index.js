import React from "react";
import { Link } from "react-router-dom";

import './styles.css';

function Navbar() {
  const { location } = window;
  const path = location.pathname.replace("/", "");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="./history">
        <b>{process.env.REACT_APP_NAME}</b>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <Link
              className={`btn btn-outline-message ${path === "message/new" ? "active" : ""}`}
              to="../message/new"
            >
              <i className="fas fa-envelope"></i> Enviar Mensagem
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;