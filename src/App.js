import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { logoutUser } from "./features/auth/authSlice";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="App">
      <h1>WELCOME TO CAR BOOKING APPP</h1>
      <Router>
        <Routes>
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {user && (
            <>
              <Route path="/" element={<Home />} />
            </>
          )}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </Router>
      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default App;
