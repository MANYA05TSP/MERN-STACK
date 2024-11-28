import React, { useState } from "react";
import "./HomesPage.css";
import Home1 from "../assets/homeservice1.png"; // Replace with actual image path
import Home2 from "../assets/homeservice2.png"; // Replace with actual image path
import Home3 from "../assets/homeservice3.png"; // Replace with actual image path
import Home4 from "../assets/homeservice4.png"; // Replace with actual image path
import Home5 from "../assets/homeservice5.png"; // Replace with actual image path

const HomesPage = () => {
    const services = [
      {
        title: "Intense Bathroom Cleaning",
        description: "Comprehensive cleaning for your bathroom, ensuring hygiene and freshness.",
        rating: "4.85 (22K)",
        price: "₹1,499",
        image: Home1,
      },
      {
        title: "Deep Cleaning",
        description: "A detailed cleaning service for your entire home, reaching all corners.",
        rating: "4.80 (18K)",
        price: "₹3,499",
        image: Home2,
      },
      {
        title: "Tap Repair",
        description: "Efficient and quick repair for leaky or broken taps.",
        rating: "4.72 (7K)",
        price: "₹499",
        image: Home3,
      },
      {
        title: "Plumber Visit",
        description: "Professional plumber visit to fix any plumbing issues.",
        rating: "4.90 (12K)",
        price: "₹899",
        image: Home4,
      },
      {
        title: "Automatic Washing",
        description: "Expert washing machine repair and installation services.",
        rating: "4.78 (9K)",
        price: "₹1,199",
        image: Home5,
      },
    ];
  
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product
    const visibleCount = 3; // Number of images to display at once
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + visibleCount) % services.length
      );
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        (prevIndex - visibleCount + services.length) % services.length
      );
    };
  
    // Get the currently visible services
    const visibleServices = [];
    for (let i = 0; i < visibleCount; i++) {
      visibleServices.push(services[(currentIndex + i) % services.length]);
    }
  
    return (
      <div className="homes-page">
        <h1>Most Booked Home Services</h1>
        <div className="carousel-container">
          <button onClick={handlePrev} className="carousel-button">{"<"}</button>
          <div className="carousel-content">
            {visibleServices.map((service, index) => (
              <div
                key={index}
                className="carousel-item"
                onClick={() => setSelectedProduct(service)} // Set the clicked product
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="carousel-image"
                />
                <h3>{service.title}</h3>
                <p>{service.rating}</p>
                <p>{service.price}</p>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="carousel-button">{">"}</button>
        </div>
  
        {selectedProduct && (
          <div className="product-details">
            <h2>{selectedProduct.title}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="product-details-image"
            />
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Rating:</strong> {selectedProduct.rating}</p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
          </div>
        )}
      </div>
    );
  };
export default HomesPage;  