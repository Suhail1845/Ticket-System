import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUser = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch tickets from backend when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        alert("Failed to fetch tickets. Please try again.");
      });
  }, []); // Empty dependency array ensures this runs once on mount

  // Filter tickets by search ID, name, and date range
  const filteredTickets = tickets.filter((ticket) => {
    const ticketDate = new Date(ticket.createdAt);

    const isWithinDateRange =
      (startDate ? ticketDate >= new Date(startDate) : true) &&
      (endDate ? ticketDate <= new Date(endDate) : true);

    return (
      (ticket.id.toString().includes(searchId) || searchId === "") &&
      (ticket.name.toLowerCase().includes(searchName.toLowerCase()) || searchName === "") &&
      isWithinDateRange
    );
  });

  // Sorting tickets: First by status (Pending first), then by createdAt (most recent first)
  const sortedTickets = filteredTickets.sort((a, b) => {
    // First, sort by status: Pending tickets come first
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;

    // Then, sort by createdAt for Pending tickets and solvedAt for Solved tickets
    if (a.status === "Solved" && b.status === "Solved") {
      return new Date(b.solvedAt) - new Date(a.solvedAt); // Most recent solved tickets first
    }

    return new Date(b.createdAt) - new Date(a.createdAt); // Most recent tickets first
  });

  const handleSolveConfirmation = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleSolve = (ticketId) => {
    axios
      .put(`http://localhost:5000/tickets/${ticketId}`, {
        status: "Solved",
        solvedAt: new Date().toISOString(),
      })
      .then((response) => {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId ? response.data : ticket
          )
        );
        setSelectedTicket(null);
      })
      .catch((error) => {
        console.error("Error updating ticket:", error);
        alert("Failed to update the ticket status. Please try again.");
      });
  };

  const solvedTicketsCount = sortedTickets.filter(
    (ticket) => ticket.status === "Solved"
  ).length;
  const pendingTicketsCount = sortedTickets.filter(
    (ticket) => ticket.status === "Pending"
  ).length;
  const totalTicketsCount = sortedTickets.length;

  // Reset all filters
  const resetFilters = () => {
    setSearchId("");
    setSearchName("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen">
      {/* Centered Admin Dashboard Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">🛠️ Admin Dashboard</h2>
      </div>

      {/* Centered Ticket Summary */}
      <div className="bg-white p-4 shadow rounded mb-6 text-center">
        <p>
          <strong>Total Tickets:</strong> {totalTicketsCount}
        </p>
        <p>
          <strong>Pending Tickets:</strong> {pendingTicketsCount}
        </p>
        <p>
          <strong>Solved Tickets:</strong> {solvedTicketsCount}
        </p>
      </div>

      {/* Search Filters */}
      <div className="flex flex-wrap gap-6 justify-center mb-6">
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="searchId" className="mr-2 text-sm sm:text-base text-indigo-700">Search by ID:</label>
          <input
            type="text"
            id="searchId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Ticket ID"
            className="p-2 border-2 border-indigo-300 rounded w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="searchName" className="mr-2 text-sm sm:text-base text-indigo-700">Search by Name:</label>
          <input
            type="text"
            id="searchName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter Name"
            className="p-2 border-2 border-indigo-300 rounded w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="startDate" className="mr-2 text-sm sm:text-base text-indigo-700">From Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border-2 border-indigo-300 rounded w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="endDate" className="mr-2 text-sm sm:text-base text-indigo-700">To Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border-2 border-indigo-300 rounded w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* Reset Button */}
        <div className="flex items-center w-full sm:w-auto">
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full sm:w-32"
          >
            Reset
          </button>
        </div>
      </div>

      {sortedTickets.length === 0 ? (
        <p className="text-gray-600 text-center">No tickets available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white shadow p-4 rounded border">
              <div className="font-semibold text-indigo-700">
                Ticket ID: {ticket.id}
              </div>
              <div className="text-gray-800">Name: {ticket.name || "N/A"}</div>
              <div className="text-indigo-600">Title: {ticket.title || "Untitled"}</div>
              <div className="text-gray-600">
                Problem: {ticket.description || "No description provided"}
              </div>
              
              <div
                className={`font-semibold ${
                  ticket.status === "Pending"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Status: {ticket.status}
              </div>
              <div className="text-sm text-gray-500">
                Created At: {new Date(ticket.createdAt).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Solved At:{" "}
                {ticket.status === "Solved"
                  ? new Date(ticket.solvedAt).toLocaleString()
                  : "—"}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleSolveConfirmation(ticket)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full disabled:bg-gray-300"
                  disabled={ticket.status === "Solved"}
                >
                  {ticket.status === "Solved" ? "Solved" : "Mark as Solved"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4">Confirm Action</h3>
            <p className="mb-4">
              Are you sure you want to mark{" "}
              <strong>{selectedTicket.title}</strong> as solved?
            </p>
            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleSolve(selectedTicket.id)}
              >
                Yes, Solve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedTicket(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
