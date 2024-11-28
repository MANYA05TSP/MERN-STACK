import React, { useState, useContext } from "react";
import "./electrician.css";  // Create the custom CSS for Electrician & Plumber page
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/header/CartContext";  // Correct path for CartContext

// Service data for Electrician, Plumber, and Home Installation
const servicesData = {
  electrician: [
    { id: 1, name: "Electrical Wiring", image: "path/to/electrician-image.jpg", rating: 4.7, cost: 799 },
    { id: 2, name: "Switch Installation", image: "path/to/switch-installation-image.jpg", rating: 4.5, cost: 399 },
  ],
  plumber: [
    { id: 3, name: "Pipe Repair", image: "path/to/plumber-image.jpg", rating: 4.6, cost: 499 },
    { id: 4, name: "Leakage Fix", image: "path/to/leakage-fix-image.jpg", rating: 4.8, cost: 699 },
  ],
  carpenter: [
    { id: 5, name: "Furniture Assembly", image: "path/to/carpenter-image.jpg", rating: 4.6, cost: 999 },
    { id: 6, name: "Wooden Floor Installation", image: "path/to/wooden-floor-installation-image.jpg", rating: 4.7, cost: 1999 },
  ],
  homeInstallation: [
    { id: 7, name: "TV Mounting", image: "path/to/tv-mounting-image.jpg", rating: 4.9, cost: 799 },
    { id: 8, name: "AC Installation", image: "path/to/ac-installation-image.jpg", rating: 4.8, cost: 1499 },
  ],
  all: [
    { id: 1, name: "Electrical Wiring", image: "path/to/electrician-image.jpg", rating: 4.7, cost: 799 },
    { id: 2, name: "Switch Installation", image: "path/to/switch-installation-image.jpg", rating: 4.5, cost: 399 },
    { id: 3, name: "Pipe Repair", image: "path/to/plumber-image.jpg", rating: 4.6, cost: 499 },
    { id: 4, name: "Leakage Fix", image: "path/to/leakage-fix-image.jpg", rating: 4.8, cost: 699 },
    { id: 5, name: "Furniture Assembly", image: "path/to/carpenter-image.jpg", rating: 4.6, cost: 999 },
    { id: 6, name: "Wooden Floor Installation", image: "path/to/wooden-floor-installation-image.jpg", rating: 4.7, cost: 1999 },
    { id: 7, name: "TV Mounting", image: "path/to/tv-mounting-image.jpg", rating: 4.9, cost: 799 },
    { id: 8, name: "AC Installation", image: "path/to/ac-installation-image.jpg", rating: 4.8, cost: 1499 },
  ],
};

const Electrician = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext); // Accessing CartContext
  const navigate = useNavigate();

  // Handle Category Selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Check if service is already in the cart
  const isServiceInCart = (id) => cartItems.some((item) => item.id === id);

  // Get services based on selected category
  const servicesToShow = servicesData[selectedCategory];

  // Handle adding/removing from cart
  const handleAddToCart = (service) => {
    if (isServiceInCart(service.id)) {
      removeFromCart(service);  // Remove item if already in cart
    } else {
      addToCart(service);  // Add item if not in cart
    }
  };

  return (
    <div className="electricianPlumberPage">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Electrician & Plumber Services</h2>
        <ul>
          {Object.keys(servicesData).map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "selected" : ""}
              onClick={() => handleCategorySelect(category)}
            >
              <span className="circle-indicator">
                {selectedCategory === category && <span className="filled-circle"></span>}
              </span>
              {category.charAt(0).toUpperCase() + category.slice(1)} Services
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="services">
        <h2>Available Services</h2>
        <div className="service-grid">
          {servicesToShow.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => navigate(`/services/${service.id}`)} // Navigate to service details page
            >
              <img src={service.image} alt={service.name} />
              <h3>{service.name}</h3>
              <div className="rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(service.rating) ? "filled" : i < service.rating ? "half-filled" : ""}
                  >
                    ★
                  </span>
                ))}
                <span>({service.rating})</span>
              </div>
              <p className="cost">₹{service.cost}</p>
              <button
                className={`add-to-cart ${isServiceInCart(service.id) ? "added" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(service);
                }}
              >
                {isServiceInCart(service.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electrician;
