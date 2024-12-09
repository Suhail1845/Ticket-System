import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to control the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>     
      <nav className="w-full h-16 bg-gray-800 text-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-4">          
          <h1 className="text-2xl font-bold tracking-wide">Ticket System</h1>
          
          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/create-ticket"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Create Ticket
              </Link>
            </li>
            <li>
              <Link
                to="/ticket-status"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Ticket Status
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (shown when isMenuOpen is true) */}
      <div className={`md:hidden bg-gray-800 text-white ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="space-y-4 px-4 py-2">
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className="block py-2 hover:text-blue-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create-ticket"
              onClick={closeMenu} 
              className="block py-2 hover:text-blue-400 transition duration-300"
            >
              Create Ticket
            </Link>
          </li>
          <li>
            <Link
              to="/ticket-status"
              onClick={closeMenu} 
              className="block py-2 hover:text-blue-400 transition duration-300"
            >
              Ticket Status
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
