import React, { useState } from "react";
import "./BeautyPage.css";
import Beauty1 from "../assets/beauty1.png";
import Beauty2 from "../assets/beauty2.png";
import Beauty3 from "../assets/beauty3.png";
import Beauty4 from "../assets/beauty4.png";
import Beauty5 from "../assets/beauty5.png";

const BeautyPage = () => {
  const services = [
    {
      title: "In curl/out curl blow-dry",
      description: "A perfect blow-dry for smooth, curled hair with salon-quality finish.",
      rating: "4.80 (31K)",
      price: "₹399",
      image: Beauty1,
    },
    {
      title: "Basic makeup package",
      description: "A package that covers all basic makeup needs for any occasion.",
      rating: "4.72 (13K)",
      price: "₹2,099",
      image: Beauty2,
    },
    {
      title: "Makeup & hairstyling",
      description: "Combo package for makeup and hairstyling by professionals.",
      rating: "4.74 (6K)",
      price: "₹1,599",
      image: Beauty3,
    },
    {
      title: "Straight & smooth blow-dry",
      description: "A blow-dry service for straight, smooth, and silky hair.",
      rating: "4.87 (33K)",
      price: "₹399",
      image: Beauty4,
    },
    {
      title: "Basic makeup",
      description: "Simple and elegant makeup for your daily needs.",
      rating: "4.72 (6K)",
      price: "₹1,599",
      image: Beauty5,
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
    <div className="beauty-page">
      {/* Header */}
      <h1>Most Booked Services</h1>
      
      {/* Carousel */}
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

      {/* Product Details */}
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

export default BeautyPage;
