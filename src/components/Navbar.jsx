import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleSectionNavigation = (sectionId) => {
    if (sectionId === 'experience') {
      // Experience button should go to top of work page
      if (location.pathname === '/work') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/work');
      }
    } else if (sectionId === 'projects') {
      // Projects button should scroll to projects section
      if (location.pathname === '/work') {
        const element = document.getElementById('projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/work');
        // After navigation, scroll to projects
        setTimeout(() => {
          const element = document.getElementById('projects');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

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
          <button 
            onClick={() => handleSectionNavigation('experience')}
            className="text-gray-600 hover:text-purple-500 transition-colors cursor-pointer"
          >
            Experience
          </button>
          <button 
            onClick={() => handleSectionNavigation('projects')}
            className="text-gray-600 hover:text-purple-500 transition-colors cursor-pointer"
          >
            Projects
          </button>
          <a href="https://aarushgoradia.substack.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-500 transition-colors">
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
}