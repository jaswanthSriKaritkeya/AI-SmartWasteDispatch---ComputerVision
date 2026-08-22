import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CitizenDashboard from './pages/CitizenDashboard';
import FleetDashboard from './pages/FleetDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Notification from './components/Notification';
import { NotificationProvider } from './hooks/useNotification';
import Location from "./components/Location";
import Map from "./components/Map";
import LocationMap from "./components/LocationMap";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-dark text-white font-sans selection:bg-primary-light selection:text-black">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
              <Route path="/fleet-dashboard" element={<FleetDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/location" element={<Location />} />
              <Route path="/map" element={<Map />} />
              <Route path="/location-map" element={<LocationMap />} />
            </Routes>
          </main>
          
          <Footer />
          <Notification />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
