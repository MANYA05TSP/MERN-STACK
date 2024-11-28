import React, { useState, useContext } from "react";
import "./womenSpa.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/header/CartContext";  // Correct path for CartContext

// Service data
const servicesData = {
  hair: [
    { id: 1, name: "Hair Cut", image: "path/to/image.jpg", rating: 4.5, cost: 299 },
    { id: 2, name: "Hair Styling", image: "path/to/image.jpg", rating: 4.0, cost: 499 },
  ],
  makeup: [
    { id: 3, name: "Full Makeup", image: "path/to/image.jpg", rating: 4.7, cost: 1499 },
    { id: 4, name: "Bridal Makeup", image: "path/to/image.jpg", rating: 5.0, cost: 3999 },
  ],
  pedicure: [
    { id: 5, name: "Basic Pedicure", image: "path/to/image.jpg", rating: 4.3, cost: 699 },
    { id: 6, name: "Luxury Pedicure", image: "path/to/image.jpg", rating: 4.8, cost: 999 },
  ],
  manicure: [
    { id: 7, name: "Basic Manicure", image: "path/to/image.jpg", rating: 4.1, cost: 599 },
    { id: 8, name: "Gel Manicure", image: "path/to/image.jpg", rating: 4.9, cost: 899 },
  ],
  all: [
    { id: 1, name: "Hair Cut", image: "path/to/image.jpg", rating: 4.5, cost: 299 },
    { id: 2, name: "Hair Styling", image: "path/to/image.jpg", rating: 4.0, cost: 499 },
    { id: 3, name: "Full Makeup", image: "path/to/image.jpg", rating: 4.7, cost: 1499 },
    { id: 4, name: "Bridal Makeup", image: "path/to/image.jpg", rating: 5.0, cost: 3999 },
    { id: 5, name: "Basic Pedicure", image: "path/to/image.jpg", rating: 4.3, cost: 699 },
    { id: 6, name: "Luxury Pedicure", image: "path/to/image.jpg", rating: 4.8, cost: 999 },
    { id: 7, name: "Basic Manicure", image: "path/to/image.jpg", rating: 4.1, cost: 599 },
    { id: 8, name: "Gel Manicure", image: "path/to/image.jpg", rating: 4.9, cost: 899 },
  ],
};

const WomensSpa = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);  // Correct context usage
  const navigate = useNavigate();

  // Handle Category Selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Check if service is already in the cart
  const isServiceInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  // Get services based on selected category
  const servicesToShow = servicesData[selectedCategory];

  // Handle adding/removing from cart
  const handleAddToCart = (service) => {
    console.log(`Service clicked:`, service);
    if (isServiceInCart(service.id)) {
      console.log('Service already in cart, removing...');
      removeFromCart(service.id);  // Remove item if already in cart
    } else {
      console.log('Service not in cart, adding...');
      addToCart(service);  // Add item if not in cart
    }
  };

  return (
    <div className="womensSpaPage">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Women's Spa</h2>
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
              onClick={() => navigate(`/services/${service.id}`)}
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

export default WomensSpa;
