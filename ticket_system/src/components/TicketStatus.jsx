import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketStatus = () => {
  const [tickets, setTickets] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  // Fetch tickets from the backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets") 
      .then((response) => {
        setTickets(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  // Filter tickets by search ID or name
  const filteredTickets = tickets.filter((ticket) => {
    return (
      (ticket.id.toString().includes(searchId) || searchId === "") &&
      (ticket.name.toLowerCase().includes(searchName.toLowerCase()) || searchName === "")
    );
  });

  // Sort tickets: "Pending" tickets first, then by creation date or solved date
  const sortedTickets = filteredTickets.sort((a, b) => {
    // First: Pending tickets come first
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;

    // Second: For non-Pending tickets, order by Solved date if available, otherwise by Created date
    const aDate = a.status === "Solved" && a.solvedAt ? new Date(a.solvedAt) : new Date(a.createdAt);
    const bDate = b.status === "Solved" && b.solvedAt ? new Date(b.solvedAt) : new Date(b.createdAt);

    return bDate - aDate; // Sort by date in descending order
  });

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-700">🎟️ Ticket Status</h2>
        <p className="text-gray-600 mt-2">Track the status of all submitted tickets</p>
      </div>

      {/* Search Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="searchId" className="font-semibold text-indigo-700">Search by ID:</label>
          <input
            type="text"
            id="searchId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Ticket ID"
            className="p-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-56"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="searchName" className="font-semibold text-indigo-700">Search by Name:</label>
          <input
            type="text"
            id="searchName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter Name"
            className="p-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-56"
          />
        </div>
      </div>

      {/* Ticket List */}
      {sortedTickets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTickets.map(
            ({ id, name, title, description, status, createdAt, solvedAt }) => (
              <div
                key={id}
                className={`bg-white p-6 shadow-lg rounded-lg cursor-pointer ${
                  status === "Pending" ? "border-l-4 border-yellow-500" : "border-l-4 border-green-500"
                }`}
              >
                <p className="text-lg font-semibold text-indigo-600">
                  <strong>Name:</strong> {name || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Ticket ID:</strong> {id}
                </p>
                <h3 className="text-2xl font-bold text-indigo-800 mt-2">{title || "Untitled"}</h3>
                {/* Description with wrapping */}
                <p className="text-gray-600 break-words">
                  {description || "No description provided."}
                </p>
                <p
                  className={`mt-2 text-lg font-semibold ${
                    status === "Pending" ? "text-yellow-500" : "text-green-500"
                  }`}
                >
                  <strong>Status:</strong> {status}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
                </p>
                {status === "Solved" && solvedAt && (
                  <p className="text-sm text-gray-500">
                    <strong>Solved At:</strong> {new Date(solvedAt).toLocaleString()}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-6">No tickets available.</p>
      )}
    </div>
  );
};

export default TicketStatus;
