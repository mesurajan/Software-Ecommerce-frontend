// src/components/ComingSoon.jsx
import React from "react";
import ComingSoonImg from "../../assets/images/coming-soon.png";
import { Link } from "react-router-dom";

const ComingSoon = ({ title = "This Page" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 py-20 bg-gray-50">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#0A174E]">
        {title} is Coming Soon!
      </h1>
      <p className="text-gray-600 mb-8 max-w-lg text-base md:text-lg">
        We are working hard to bring this feature to you. Stay tuned and check back soon for updates.
      </p>
      <img
        src={ComingSoonImg}
        alt="Coming Soon"
        className="w-72 md:w-120 mb-10 animate-fade"
      />
      <Link
        to="/admin/dashboard"
        className="px-8 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default ComingSoon;
