import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Recycle, Truck, Trash2, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                <Trash2 className="h-6 w-6 text-black" />
                <Recycle className="h-4 w-4 text-gray-500 absolute -top-1 -right-1" />
              </div>
              <span className="font-bold text-xl tracking-tight text-black ml-2">SmartWaste</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">Home</Link>
            <Link to="/#how-it-works" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">How It Works</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={user?.role === 'citizen' ? '/citizen/dashboard' : '/captain/dashboard'}
                  className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                >
                  Logout
                </button>
                {user?.role === 'citizen' && (
                  <Link to="/citizen/report" className="btn-primary py-2 text-sm">
                    Report Waste
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">Login</Link>
                <Link to="/citizen/report" className="btn-primary py-2 text-sm">
                  Report Waste
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-black"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4 space-y-4">
          <Link to="/" className="block text-gray-600 hover:text-black text-base font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/#how-it-works" className="block text-gray-600 hover:text-black text-base font-medium" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to={user?.role === 'citizen' ? '/citizen/dashboard' : '/captain/dashboard'}
                className="block text-gray-600 hover:text-black text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="block w-full text-left text-gray-600 hover:text-black text-base font-medium"
              >
                Logout
              </button>
              {user?.role === 'citizen' && (
                <Link to="/citizen/report" className="block w-full text-center btn-primary py-2 mt-4" onClick={() => setMobileMenuOpen(false)}>
                  Report Waste
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-600 hover:text-black text-base font-medium" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/citizen/report" className="block w-full text-center btn-primary py-2 mt-4" onClick={() => setMobileMenuOpen(false)}>
                Report Waste
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
