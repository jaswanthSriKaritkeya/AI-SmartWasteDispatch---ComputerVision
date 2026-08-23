import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedRoute, RoleProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Citizen Pages
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import ReportWaste from './pages/citizen/ReportWaste';
import Reports from './pages/citizen/Reports';
import ReportDetails from './pages/citizen/ReportDetails';

// Captain Pages
import CaptainDashboard from './pages/captain/CaptainDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Citizen Routes */}
              <Route path="/citizen/dashboard" element={
                <RoleProtectedRoute allowedRole="citizen">
                  <CitizenDashboard />
                </RoleProtectedRoute>
              } />
              <Route path="/citizen/report" element={
                <RoleProtectedRoute allowedRole="citizen">
                  <ReportWaste />
                </RoleProtectedRoute>
              } />
              <Route path="/citizen/reports" element={
                <RoleProtectedRoute allowedRole="citizen">
                  <Reports />
                </RoleProtectedRoute>
              } />
              <Route path="/citizen/reports/:reportId" element={
                <RoleProtectedRoute allowedRole="citizen">
                  <ReportDetails />
                </RoleProtectedRoute>
              } />

              {/* Captain Routes */}
              <Route path="/captain/dashboard" element={
                <RoleProtectedRoute allowedRole="captain">
                  <CaptainDashboard />
                </RoleProtectedRoute>
              } />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
