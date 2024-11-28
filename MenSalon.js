import React, { useState, useContext } from "react";
import "./mensalon.css";  // Add your custom CSS for Men's Salon
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/header/CartContext"; // Correct path for CartContext

// Service data for Men's Salon
const servicesData = {
  haircut: [
    { id: 1, name: "Men's Haircut", image: "path/to/haircut-image.jpg", rating: 4.5, cost: 499 },
    { id: 2, name: "Beard Styling", image: "path/to/beard-styling-image.jpg", rating: 4.2, cost: 399 },
  ],
  massage: [
    { id: 3, name: "Full Body Massage", image: "path/to/massage-image.jpg", rating: 4.8, cost: 799 },
    { id: 4, name: "Back Massage", image: "path/to/back-massage-image.jpg", rating: 4.6, cost: 499 },
  ],
  face: [
    { id: 5, name: "Men's Facial", image: "path/to/face-image.jpg", rating: 4.7, cost: 999 },
    { id: 6, name: "Anti-Aging Facial", image: "path/to/anti-aging-face-image.jpg", rating: 4.9, cost: 1499 },
  ],
  all: [
    { id: 1, name: "Men's Haircut", image: "path/to/haircut-image.jpg", rating: 4.5, cost: 499 },
    { id: 2, name: "Beard Styling", image: "path/to/beard-styling-image.jpg", rating: 4.2, cost: 399 },
    { id: 3, name: "Full Body Massage", image: "path/to/massage-image.jpg", rating: 4.8, cost: 799 },
    { id: 4, name: "Back Massage", image: "path/to/back-massage-image.jpg", rating: 4.6, cost: 499 },
    { id: 5, name: "Men's Facial", image: "path/to/face-image.jpg", rating: 4.7, cost: 999 },
    { id: 6, name: "Anti-Aging Facial", image: "path/to/anti-aging-face-image.jpg", rating: 4.9, cost: 1499 },
  ],
};

const MenSalon = () => {
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
      removeFromCart(service.id);  // Corrected: Remove item by ID
    } else {
      addToCart(service);  // Add item if not in cart
    }
  };

  return (
    <div className="menSalonPage">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Men's Salon</h2>
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
                  e.stopPropagation(); // Prevent navigating to service details
                  handleAddToCart(service);  // Handle adding/removing from cart
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

export default MenSalon;
