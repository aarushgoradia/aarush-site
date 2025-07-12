import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-amber-50 text-gray-800 px-6 py-4 shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-heading font-bold text-purple-600 hover:text-purple-500 transition-colors">
          Aarush Goradia
        </Link>
        <div className="space-x-8 text-sm font-body font-medium">
          <Link to="/" className="text-gray-600 hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link to="/work" className="text-gray-600 hover:text-purple-500 transition-colors">
            Experience & Projects
          </Link>
          <a href="https://aarushgoradia.substack.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-500 transition-colors">
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
}