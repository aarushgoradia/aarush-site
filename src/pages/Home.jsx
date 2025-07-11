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
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/5327.jpg",
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
    <div className="min-h-[calc(100vh-4rem)] bg-gray-900 text-white font-mono flex flex-col md:flex-row">
      {/* Left Half: Photo */}
      <div className="md:w-1/2 w-full flex items-center justify-center overflow-hidden p-6">
        <img
          src="/my-photo.jpg"
          alt="Aarush Goradia"
          className="w-full h-full max-h-[85vh] object-cover object-top rounded-lg shadow-lg"
        />
      </div>

      {/* Right Half: Intro */}
      <div className="md:w-1/2 w-full flex flex-col justify-center p-6 md:pl-10 space-y-4 overflow-y-auto">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Hi, I'm Aarush</h1>
          <p className="text-lg text-gray-300 h-12">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Icons */}
          <div className="flex flex-col space-y-1.5 pt-2 text-sm">
            <a href="mailto:aarush.goradia@princeton.edu" className="hover:text-cyan-400">
              <FaEnvelope className="inline mr-2" /> aarush.goradia@princeton.edu
            </a>
            <a href="https://github.com/aarushgoradia" target="_blank" className="hover:text-cyan-400">
              <FaGithub className="inline mr-2" /> github.com/aarushgoradia
            </a>
            <a href="https://www.linkedin.com/in/aarush-goradia-300216215/" target="_blank" className="hover:text-cyan-400">
              <FaLinkedin className="inline mr-2" /> linkedin.com/in/aarushgoradia
            </a>
            <a href="/aarushgoradia-resume-hardware.pdf" target="_blank" className="hover:text-cyan-400">
              📄 View Hardware Resume
            </a>
            <a href="/aarushgoradia-resume-software.pdf" target="_blank" className="hover:text-green-400">
              📄 View Software Resume
            </a>
          </div>

          {/* Skills Snapshot */}
          <div className="flex flex-wrap gap-2 pt-3">
            {[
              "C++", "C", "Python", "Java", "Verilog",
              "Git","Bash", "Linux"
            ].map((skill) => (
              <span
                key={skill}
                className="bg-gray-800 text-sm px-2 py-1 rounded-full border border-cyan-500"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Now Reading Section */}
        <div className="relative">
          <div 
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-4 cursor-pointer hover:border-cyan-500 transition-colors duration-300"
            onMouseEnter={triggerEasterEgg}
          >
            <h2 className="text-base font-semibold text-cyan-300 mb-3 flex items-center">
              📚 Currently Reading
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-20 bg-gray-700 rounded shadow-lg flex items-center justify-center flex-shrink-0">
                {currentBook.coverUrl ? (
                  <img 
                    src={currentBook.coverUrl} 
                    alt={currentBook.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-2xl">📖</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white mb-1">
                  {currentBook.bookLink ? (
                    <a 
                      href={currentBook.bookLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-cyan-300 transition-colors underline"
                    >
                      "{currentBook.title}" by {currentBook.author}
                    </a>
                  ) : (
                    <span>"{currentBook.title}" by {currentBook.author}</span>
                  )}
                </h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {currentBook.subtitle}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">
                    Page {currentBook.currentPage} of {currentBook.totalPages}
                  </span>
                  <span className="text-sm text-gray-400">{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Easter Egg */}
          {showEasterEgg && (
            <div className="easter-egg-message absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-10">
              <div className="bg-cyan-500 text-gray-900 px-4 py-2 rounded-lg shadow-lg border-2 border-cyan-400">
                <p className="text-sm font-bold whitespace-nowrap">
                  {easterEggText}
                  <span className="animate-pulse">|</span>
                </p>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-cyan-500"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
