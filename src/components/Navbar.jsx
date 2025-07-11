import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-950 text-white px-6 py-4 font-mono shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-cyan-400 hover:text-cyan-300">
          Aarush Goradia
        </Link>
        <div className="space-x-6 text-sm">
          <Link to="/" className="hover:text-cyan-300">
            Home
          </Link>
          <Link to="/work" className="hover:text-cyan-300">
            Work & Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}