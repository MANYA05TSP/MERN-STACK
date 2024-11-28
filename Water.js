import React, { useState, useContext } from "react";
import "./water.css";  // Create the custom CSS for Native Water Purifier page
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/header/CartContext";  // Correct path for CartContext

// Service data for Native Water Purifier
const servicesData = {
  installation: [
    { id: 1, name: "Water Purifier Installation", image: "path/to/installation-image.jpg", rating: 4.7, cost: 799 },
  ],
  maintenance: [
    { id: 2, name: "Water Purifier Maintenance", image: "path/to/maintenance-image.jpg", rating: 4.5, cost: 499 },
  ],
  filterReplacement: [
    { id: 3, name: "Water Filter Replacement", image: "path/to/filter-replacement-image.jpg", rating: 4.8, cost: 699 },
  ],
  roService: [
    { id: 4, name: "RO Service", image: "path/to/ro-service-image.jpg", rating: 4.9, cost: 999 },
  ],
  all: [
    { id: 1, name: "Water Purifier Installation", image: "path/to/installation-image.jpg", rating: 4.7, cost: 799 },
    { id: 2, name: "Water Purifier Maintenance", image: "path/to/maintenance-image.jpg", rating: 4.5, cost: 499 },
    { id: 3, name: "Water Filter Replacement", image: "path/to/filter-replacement-image.jpg", rating: 4.8, cost: 699 },
    { id: 4, name: "RO Service", image: "path/to/ro-service-image.jpg", rating: 4.9, cost: 999 },
  ],
};

const Water = () => {
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
    <div className="nativeWaterPurifierPage">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Native Water Purifier Services</h2>
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

export default Water;
