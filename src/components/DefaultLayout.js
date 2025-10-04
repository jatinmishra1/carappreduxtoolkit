import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <h1>
            <Link to="/" className="logo">
              carstorE
            </Link>
          </h1>

          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setShowMenu(!showMenu)}
            >
              {user?.username || "Guest"}
            </button>

            {showMenu && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/userbookings">Bookings</Link>
                </li>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
                <li onClick={handleLogout} style={{ color: "orangered" }}>
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content">{children}</main>

      {/* Footer */}
      <footer className="footer">
        <hr />
        <p>Designed and Developed By</p>
        <p>JATIN MISHRA</p>
      </footer>
    </div>
  );
}

export default DefaultLayout;
