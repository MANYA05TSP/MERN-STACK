import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

// Corrected paths to assets
import WomenSpaIcon from "../../assets/women spa.png";
import MenSpaIcon from "../../assets/men spa.png";
import AcServiceIcon from "../../assets/ac service.png";
import CleaningIcon from "../../assets/cleaning.png";
import PlumberIcon from "../../assets/plumber.png";
import PaintingIcon from "../../assets/painting.png";
import WallPanelIcon from "../../assets/wall panel.png";
import WaterFilterIcon from "../../assets/waterfilter.png";
import SmartLockIcon from "../../assets/smart lock.png";

// Service images
import Service1 from "../../assets/service1.png";
import Service2 from "../../assets/service2.png";
import Service3 from "../../assets/service3.png";
import Service4 from "../../assets/service4.png";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Women's Salon & Spa",
      icon: WomenSpaIcon,
      route: "/womens-spa", // Direct route
    },
    {
      name: "Men's Salon & Massage",
      icon: MenSpaIcon,
      route: "/mensalon", // Direct route
    },
    {
      name: "AC & Appliance Repair",
      icon: AcServiceIcon,
      route: "/ac-repair", // Direct route
    },
    {
      name: "Cleaning & Pest Control",
      icon: CleaningIcon,
      route: "/cleaning", // Direct route
    },
    {
      name: "Electrician, Plumber & Carpenter",
      icon: PlumberIcon,
      route: "/repairs", // Direct route
    },
    {
      name: "Painting & Waterproofing",
      icon: PaintingIcon,
      route: "/painting", // Direct route
    },
    {
      name: "Native Water Purifier",
      icon: WaterFilterIcon,
      route: "/purifier", // Direct route
    },
    {
      name: "Native Smart Locks",
      icon: SmartLockIcon,
      route: "/locks", // Direct route
    },
    {
      name: "Wall Panels",
      icon: WallPanelIcon,
      route: "/panels", // Direct route
    },
  ];

  return (
    <div className="home">
      {/* Banner Section */}
      <div className="banner">
        <h1>Home services at your doorstep</h1>
        <p>Professional services by trained experts.</p>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <h2>What are you looking for?</h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => navigate(category.route)} // Add the onClick event to trigger navigation
            >
              <img src={category.icon} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Section */}
      <div className="visuals">
        <img src={Service1} alt="Service 1" />
        <img src={Service2} alt="Service 2" />
        <img src={Service3} alt="Service 3" />
        <img src={Service4} alt="Service 4" />
      </div>
    </div>
  );
};

export default Home;
