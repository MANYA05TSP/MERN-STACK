import React, { useState, useContext } from "react";
import "./cleaning.css";  // Create the custom CSS for Cleaning and Pest Control page
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/header/CartContext";  // Correct path for CartContext

// Service data for Cleaning and Pest Control
const servicesData = {
  bathroomCleaning: [
    { id: 1, name: "Bathroom Deep Clean", image: "path/to/bathroom-cleaning-image.jpg", rating: 4.5, cost: 799 },
    { id: 2, name: "Bathroom Surface Clean", image: "path/to/bathroom-surface-clean-image.jpg", rating: 4.6, cost: 499 },
  ],
  kitchenCleaning: [
    { id: 3, name: "Kitchen Deep Clean", image: "path/to/kitchen-cleaning-image.jpg", rating: 4.8, cost: 999 },
    { id: 4, name: "Kitchen Surface Clean", image: "path/to/kitchen-surface-clean-image.jpg", rating: 4.7, cost: 699 },
  ],
  sofaCleaning: [
    { id: 5, name: "Sofa Deep Clean", image: "path/to/sofa-cleaning-image.jpg", rating: 4.5, cost: 1199 },
    { id: 6, name: "Sofa Shampooing", image: "path/to/sofa-shampooing-image.jpg", rating: 4.4, cost: 899 },
  ],
  fullHomeCleaning: [
    { id: 7, name: "Full Home Deep Clean", image: "path/to/full-home-cleaning-image.jpg", rating: 4.9, cost: 2999 },
    { id: 8, name: "Full Home Surface Clean", image: "path/to/full-home-surface-clean-image.jpg", rating: 4.6, cost: 1999 },
  ],
  termiteControl: [
    { id: 9, name: "Termite Inspection", image: "path/to/termite-inspection-image.jpg", rating: 4.7, cost: 1499 },
    { id: 10, name: "Termite Control", image: "path/to/termite-control-image.jpg", rating: 4.8, cost: 1999 },
  ],
  all: [
    { id: 1, name: "Bathroom Deep Clean", image: "path/to/bathroom-cleaning-image.jpg", rating: 4.5, cost: 799 },
    { id: 2, name: "Bathroom Surface Clean", image: "path/to/bathroom-surface-clean-image.jpg", rating: 4.6, cost: 499 },
    { id: 3, name: "Kitchen Deep Clean", image: "path/to/kitchen-cleaning-image.jpg", rating: 4.8, cost: 999 },
    { id: 4, name: "Kitchen Surface Clean", image: "path/to/kitchen-surface-clean-image.jpg", rating: 4.7, cost: 699 },
    { id: 5, name: "Sofa Deep Clean", image: "path/to/sofa-cleaning-image.jpg", rating: 4.5, cost: 1199 },
    { id: 6, name: "Sofa Shampooing", image: "path/to/sofa-shampooing-image.jpg", rating: 4.4, cost: 899 },
    { id: 7, name: "Full Home Deep Clean", image: "path/to/full-home-cleaning-image.jpg", rating: 4.9, cost: 2999 },
    { id: 8, name: "Full Home Surface Clean", image: "path/to/full-home-surface-clean-image.jpg", rating: 4.6, cost: 1999 },
    { id: 9, name: "Termite Inspection", image: "path/to/termite-inspection-image.jpg", rating: 4.7, cost: 1499 },
    { id: 10, name: "Termite Control", image: "path/to/termite-control-image.jpg", rating: 4.8, cost: 1999 },
  ],
};

const Cleaning = () => {
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
    <div className="cleaningPestControlPage">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Cleaning & Pest Control Services</h2>
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

export default Cleaning;
