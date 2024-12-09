import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateTicket from "./components/CreateTicket";
import TicketStatus from "./components/TicketStatus";
import AdminUser from "./components/AdminUser";

const App = () => {
  const [tickets, setTickets] = useState([]);

  return (
    <Router>
      <AppContent tickets={tickets} setTickets={setTickets} />
    </Router>
  );
};

const AppContent = ({ tickets, setTickets }) => {
  const location = useLocation(); // Now inside the Router context
  const hideNavbarRoutes = ['/admin']; // List of routes where Navbar should be hidden

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Navbar based on the current route */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create-ticket"
            element={<CreateTicket tickets={tickets} setTickets={setTickets} />}
          />
          <Route path="/ticket-status" element={<TicketStatus tickets={tickets} />} />
          <Route
            path="/admin"
            element={<AdminUser tickets={tickets} setTickets={setTickets} />}
          />
        </Routes>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Ticket System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
