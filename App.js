import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import BeautyPage from "./pages/BeautyPage";
import HomesPage from "./pages/HomesPage";
import NativePage from "./pages/NativePage";
import Home from "./components/Home/Home"; // Adjust the path if needed
import "./components/Home/home.css"; // Import the styles for Home
import WomensSpa from "./pages/WomenSpa"; // Assuming you have this WomenSpa component
import MenSalon from "./pages/MenSalon";
import ACService from "./pages/ACService";
import Cleaning from "./pages/Cleaning";
import Electrician from "./pages/Electrician";
import Water from "./pages/Water";
import Paint from "./pages/Paint";
import Lock from "./pages/Lock";
import Wall from "./pages/Wall";
import Cart from "./components/header/Cart";  // Displays cart items
import { CartProvider } from "./components/header/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beauty" element={<BeautyPage />} />
          <Route path="/homes" element={<HomesPage />} />
          <Route path="/native" element={<NativePage />} />
          <Route path="/womens-spa" element={<WomensSpa />} />
          <Route path="/mensalon" element={<MenSalon />} />
          <Route path="/ac-repair" element={<ACService />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/repairs" element={<Electrician />} />
          <Route path="/purifier" element={<Water />} />
          <Route path="/painting" element={<Paint />} />
          <Route path="/locks" element={<Lock />} />
          <Route path="/panels" element={<Wall />} />
          <Route path="/cart" element={<Cart />} /> {/* Corrected to Cart component */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
