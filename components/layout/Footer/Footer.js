import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container h-32 py-4 mx-auto border-t border-gray-300">
      <Link
        to="/about"
        className="text-gray-500 footer-link hover:text-blue-600"
      >
        About
      </Link>
    </div>
  );
};

export default Footer;
