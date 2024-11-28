import React, { useState, useContext } from "react";
import "./acservice.css";  // Create the custom CSS for AC Service page
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/header/CartContext";  // Correct path for CartContext

// Service data for AC and other appliances
const servicesData = {
  ac: [
    { id: 1, name: "AC Installation", image: "path/to/ac-installation-image.jpg", rating: 4.5, cost: 1499 },
    { id: 2, name: "AC Repair", image: "path/to/ac-repair-image.jpg", rating: 4.8, cost: 999 },
    { id: 3, name: "AC Gas Refill", image: "path/to/ac-gas-refill-image.jpg", rating: 4.6, cost: 1299 },
  ],
  gasStove: [
    { id: 4, name: "Gas Stove Installation", image: "path/to/gas-stove-installation-image.jpg", rating: 4.3, cost: 899 },
    { id: 5, name: "Gas Stove Repair", image: "path/to/gas-stove-repair-image.jpg", rating: 4.7, cost: 799 },
  ],
  laptop: [
    { id: 6, name: "Laptop Repair", image: "path/to/laptop-repair-image.jpg", rating: 4.9, cost: 1999 },
    { id: 7, name: "Laptop Cleaning", image: "path/to/laptop-cleaning-image.jpg", rating: 4.4, cost: 999 },
  ],
  fridge: [
    { id: 8, name: "Fridge Installation", image: "path/to/fridge-installation-image.jpg", rating: 4.6, cost: 1299 },
    { id: 9, name: "Fridge Repair", image: "path/to/fridge-repair-image.jpg", rating: 4.2, cost: 1099 },
  ],
  tv: [
    { id: 10, name: "TV Installation", image: "path/to/tv-installation-image.jpg", rating: 4.8, cost: 799 },
    { id: 11, name: "TV Repair", image: "path/to/tv-repair-image.jpg", rating: 4.7, cost: 899 },
  ],
  washingMachine: [
    { id: 12, name: "Washing Machine Installation", image: "path/to/washing-machine-installation-image.jpg", rating: 4.5, cost: 1199 },
    { id: 13, name: "Washing Machine Repair", image: "path/to/washing-machine-repair-image.jpg", rating: 4.6, cost: 999 },
  ],
  all: [
    { id: 1, name: "AC Installation", image: "path/to/ac-installation-image.jpg", rating: 4.5, cost: 1499 },
    { id: 2, name: "AC Repair", image: "path/to/ac-repair-image.jpg", rating: 4.8, cost: 999 },
    { id: 3, name: "AC Gas Refill", image: "path/to/ac-gas-refill-image.jpg", rating: 4.6, cost: 1299 },
    { id: 4, name: "Gas Stove Installation", image: "path/to/gas-stove-installation-image.jpg", rating: 4.3, cost: 899 },
    { id: 5, name: "Gas Stove Repair", image: "path/to/gas-stove-repair-image.jpg", rating: 4.7, cost: 799 },
    { id: 6, name: "Laptop Repair", image: "path/to/laptop-repair-image.jpg", rating: 4.9, cost: 1999 },
    { id: 7, name: "Laptop Cleaning", image: "path/to/laptop-cleaning-image.jpg", rating: 4.4, cost: 999 },
    { id: 8, name: "Fridge Installation", image: "path/to/fridge-installation-image.jpg", rating: 4.6, cost: 1299 },
    { id: 9, name: "Fridge Repair", image: "path/to/fridge-repair-image.jpg", rating: 4.2, cost: 1099 },
    { id: 10, name: "TV Installation", image: "path/to/tv-installation-image.jpg", rating: 4.8, cost: 799 },
    { id: 11, name: "TV Repair", image: "path/to/tv-repair-image.jpg", rating: 4.7, cost: 899 },
    { id: 12, name: "Washing Machine Installation", image: "path/to/washing-machine-installation-image.jpg", rating: 4.5, cost: 1199 },
    { id: 13, name: "Washing Machine Repair", image: "path/to/washing-machine-repair-image.jpg", rating: 4.6, cost: 999 },
  ],
};

const ACService = () => {
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
    <div className="acServicePage">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>AC & Home Appliances Services</h2>
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

export default ACService;
