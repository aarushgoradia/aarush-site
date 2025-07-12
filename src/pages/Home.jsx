import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const [typewriterText, setTypewriterText] = useState("");
  const [easterEggText, setEasterEggText] = useState("");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  // ============================================
  // 📚 CURRENTLY READING BOOK - UPDATE HERE!
  // ============================================
  const currentBook = {
    title: "Mason & Dixon",
    author: "Thomas Pynchon",
    subtitle: "A Novel",
    currentPage: 264,
    totalPages: 773,
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/Mason_%26_Dixon_%281997_1st_ed_jacket_cover%29.jpg",
    bookLink: "https://www.goodreads.com/book/show/5327.Mason_Dixon"
  };

  // Calculate progress percentage
  const progress = Math.round((currentBook.currentPage / currentBook.totalPages) * 100);
  
  const fullText = "ECE @ Princeton • Designing high-performance computing systems from silicon up.";
  const easterEggMessage = "I'm actually minoring in English!";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Easter egg typewriter effect
  const triggerEasterEgg = () => {
    if (showEasterEgg) return; // Don't trigger if already showing
    
    setShowEasterEgg(true);
    setEasterEggText("");
    
    let currentIndex = 0;
    const easterEggInterval = setInterval(() => {
      if (currentIndex <= easterEggMessage.length) {
        setEasterEggText(easterEggMessage.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(easterEggInterval);
        // Auto-hide after 3 seconds with fade out only
        setTimeout(() => {
          // Add fade-out class for smooth exit
          const easterEggElement = document.querySelector('.easter-egg-message');
          if (easterEggElement) {
            easterEggElement.classList.add('fade-out');
            setTimeout(() => {
              setShowEasterEgg(false);
              setEasterEggText("");
            }, 300);
          } else {
            setShowEasterEgg(false);
            setEasterEggText("");
          }
        }, 3000);
      }
    }, 80);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-amber-50 text-gray-800 font-body flex flex-col md:flex-row">
      {/* Left Half: Photo */}
      <div className="md:w-1/2 w-full flex items-center justify-center overflow-hidden p-8">
        <img
          src="/my-photo.jpg"
          alt="Aarush Goradia"
          className="w-full h-full max-h-[85vh] object-cover object-top rounded-2xl shadow-xl border-4 border-white"
        />
      </div>

      {/* Right Half: Intro */}
      <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:pl-12 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <h1 className="text-4xl font-heading font-bold text-gray-800">Hi, I'm Aarush</h1>
          <p className="text-lg text-gray-600 h-12 font-body">
            {typewriterText}
            <span className="animate-pulse text-purple-500">|</span>
          </p>

          {/* Icons */}
          <div className="flex flex-col space-y-2 pt-4 text-sm font-body">
            <a href="mailto:aarush.goradia@princeton.edu" className="text-gray-600 hover:text-purple-500 transition-colors flex items-center">
              <FaEnvelope className="mr-3 text-purple-400" /> aarush.goradia@princeton.edu
            </a>
            <a href="https://github.com/aarushgoradia" target="_blank" className="text-gray-600 hover:text-purple-500 transition-colors flex items-center">
              <FaGithub className="mr-3 text-purple-400" /> github.com/aarushgoradia
            </a>
            <a href="https://www.linkedin.com/in/aarush-goradia-300216215/" target="_blank" className="text-gray-600 hover:text-pink-500 transition-colors flex items-center">
              <FaLinkedin className="mr-3 text-pink-400" /> linkedin.com/in/aarushgoradia
            </a>
            <a href="/aarushgoradia-resume-hardware.pdf" target="_blank" className="text-gray-600 hover:text-purple-500 transition-colors flex items-center">
              <span className="mr-3 text-purple-400">📄</span> View Hardware Resume
            </a>
            <a href="/aarushgoradia-resume-software.pdf" target="_blank" className="text-gray-600 hover:text-blue-500 transition-colors flex items-center">
              <span className="mr-3 text-blue-400">📄</span> View Software Resume
            </a>
          </div>

          {/* Skills Snapshot */}
          <div className="flex flex-wrap gap-3 pt-4">
            {[
              "C++", "C", "Python", "Java", "Verilog",
              "Git","Bash", "Linux"
            ].map((skill) => (
              <span
                key={skill}
                className="bg-white text-sm px-3 py-1.5 rounded-full border border-purple-200 text-purple-700 shadow-sm hover:shadow-md transition-shadow font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Now Reading Section */}
        <div className="relative">
          <div 
            className="bg-white border border-purple-100 rounded-2xl p-6 mt-6 cursor-pointer hover:border-purple-300 transition-all duration-300 hover:shadow-lg"
            onMouseEnter={triggerEasterEgg}
          >
            <h2 className="text-lg font-heading font-semibold text-purple-600 mb-4 flex items-center">
              📚 Currently Reading
            </h2>
            <div className="flex items-center space-x-5">
              <div className="w-16 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-md flex items-center justify-center flex-shrink-0">
                {currentBook.coverUrl ? (
                  <img 
                    src={currentBook.coverUrl} 
                    alt={currentBook.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-2xl">📖</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-heading font-semibold text-gray-800 mb-1">
                  {currentBook.bookLink ? (
                    <a 
                      href={currentBook.bookLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-purple-600 transition-colors underline decoration-purple-300"
                    >
                      "{currentBook.title}" by {currentBook.author}
                    </a>
                  ) : (
                    <span>"{currentBook.title}" by {currentBook.author}</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2 font-body">
                  {currentBook.subtitle}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-body">
                    Page {currentBook.currentPage} of {currentBook.totalPages}
                  </span>
                  <span className="text-sm text-gray-600 font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Easter Egg */}
          {showEasterEgg && (
            <div className="easter-egg-message absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-10">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-lg border-2 border-purple-300">
                <p className="text-sm font-heading font-bold whitespace-nowrap">
                  {easterEggText}
                  <span className="animate-pulse">|</span>
                </p>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-purple-500"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
