import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

const CreateTicket = ({ setTickets, tickets }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Generate unique ticket ID
  const generateTicketID = () =>
    Math.floor(1000000000 + Math.random() * 9000000000).toString();

  // Get the current date and time in readable format
  const getCurrentDateTime = () => new Date().toLocaleString();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new ticket object
    const newTicket = {
      id: generateTicketID(),
      name,
      title,
      description,
      status: "Pending",
      createdAt: getCurrentDateTime(),
      solvedAt: null,
    };

    try {
      // Send the new ticket to the backend
      const response = await axios.post("http://localhost:5000/tickets", newTicket);

      // Update state with the response data
      setTickets([...tickets, response.data]);

      // Reset form fields
      setName("");
      setTitle("");
      setDescription("");

      // Success message
      alert(`Ticket ${response.data.id} created successfully!`);

      // Email template parameters
      const templateParams = {
        user_name: name,
        ticket_id: response.data.id,
        ticket_title: title,
        ticket_description: description,
        created_at: response.data.createdAt,
        user_email: "your-email@example.com", // Replace with the recipient's email
      };

      // Send email using EmailJS
      emailjs
        .send("service_id", "template_id", templateParams, "user_id") // Replace with your EmailJS details
        .then(
          (emailResponse) => console.log("Email sent successfully", emailResponse),
          (emailError) => console.error("Email sending error", emailError)
        );
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create the ticket. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Create Ticket
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ticket Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ticket title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Issue Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your issue"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
