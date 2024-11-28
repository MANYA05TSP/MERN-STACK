import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import logo_light from "../../assets/uc.png";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { CartContext } from "../header/CartContext";  // If Navbar.js is in components/header
// Correct context import

const Navbar = () => {
  const { cartItems } = useContext(CartContext); // Access cartItems from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleUserClick = () => {
    setIsModalOpen(true);
    setIsSignup(false);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      try {
        const response = await axios.post("http://localhost:7000/register", {
          email,
          password,
        });
        alert(response.data.message);
        setIsSignup(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        setError(error.response?.data?.message || "Error registering user.");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:7000/login", {
          email,
          password,
        });
        setUserName(response.data.user.email.split("@")[0]);
        setIsLoggedIn(true);
        setIsModalOpen(false);
      } catch (error) {
        setError(error.response?.data?.message || "Invalid email or password");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo_light} alt="Logo" className="logo" />
          <Link to="/beauty" className="nav-link">Beauty</Link>
          <Link to="/homes" className="nav-link">Homes</Link>
          <Link to="/native" className="nav-link">Native</Link>
        </div>

        <div className="nav-center">
          <div className="location-search">
            <LocationOnIcon />
            <input type="text" placeholder="Location" />
          </div>
          <div className="search-bar">
            <SearchIcon />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="nav-right">
          <Link to="/cart" className="cart-container">
            <ShoppingCartIcon className="nav-icon" />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
          {isLoggedIn ? (
            <div className="user-dropdown">
              <span>Hello, {userName}</span>
              <ul>
                <li><Link to="/my-bookings">My Bookings</Link></li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          ) : (
            <AccountCircleIcon className="nav-icon" onClick={handleUserClick} />
          )}
        </div>
      </nav>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <CloseIcon className="close-icon" onClick={handleCloseModal} />
            <h2>{isSignup ? "Sign Up" : "Login"}</h2>
            {error && <p className="error">{error}</p>}
            <form className="form" onSubmit={handleFormSubmit}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isSignup && (
                <>
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </>
              )}
              <button type="submit" className="submit-button">
                {isSignup ? "Sign Up" : "Login"}
              </button>
            </form>
            <p>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <span
                className="toggle-link"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                {isSignup ? "Login here" : "Sign up here"}
              </span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
