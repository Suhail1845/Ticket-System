import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleCreateTicket = () => navigate("/create-ticket");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Animal Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        autoPlay
        loop
        muted
      >
        {/* Example Animal Video URL */}
        <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken the background video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative text-center text-white z-10 p-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          How can I help you?
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
          Welcome to the Ticket System. Submit your issue, and we’ll take care
          of the rest.
        </p>
        <button
          onClick={handleCreateTicket}
          className="bg-blue-500 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-600 transform transition-all duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-3s"
        >
          Create a Ticket
        </button>
      </div>     
    </div>
  );
};

export default Home;
