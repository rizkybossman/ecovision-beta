import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === "/";

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full text-white z-50 transition-all duration-300 ${
        isHomePage
          ? scrolled
            ? "bg-primary-900/90 backdrop-blur-sm shadow-lg py-2"
            : "bg-transparent py-3 pt-6"
          : "bg-gradient-to-r from-primary-800 to-primary-600 shadow-lg py-2"
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-primary-300 transition-colors duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            EcoVision
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link
              to="/"
              className={`hover:text-primary-300 transition-colors duration-300 ${
                location.pathname === "/" ? "text-primary-400" : ""
              }`}
              onClick={() => {
                if (location.pathname === "/") {
                  // If already on Home, scroll to Hero
                  const heroSection = document.getElementById("hero");
                  if (heroSection)
                    heroSection.scrollIntoView({ behavior: "smooth" });
                } else {
                  // If on another page, navigate to Home (which includes Hero)
                  window.scrollTo(0, 0);
                }
              }}
            >
              Home
            </Link>
            <Link
              to="/ecosight"
              className={`hover:text-primary-300 transition-colors duration-300 ${
                location.pathname.includes("ecosight") ? "text-primary-400" : ""
              }`}
            >
              Eco Sight
            </Link>
            <Link
              to="/EcoActive"
              className={`hover:text-primary-300 transition-colors duration-300 ${
                location.pathname.includes("EcoActive")
                  ? "text-primary-400"
                  : ""
              }`}
            >
              Eco Active
            </Link>
            <Link
              to="/ecoquest"
              className={`hover:text-primary-300 transition-colors duration-300 ${
                location.pathname.includes("ecoquest") ? "text-primary-400" : ""
              }`}
            >
              Eco Quest
            </Link>
            <Link
              to="/leaderboard"
              className={`hover:text-primary-300 transition-colors duration-300 ${
                location.pathname.includes("leaderboard")
                  ? "text-primary-400"
                  : ""
              }`}
            >
              Leaderboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700/50 transition-colors duration-300 transform hover:translate-x-1"
              onClick={() => {
                setIsOpen(false);
                if (location.pathname === "/") {
                  const heroSection = document.getElementById("hero");
                  if (heroSection)
                    heroSection.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo(0, 0);
                }
              }}
            >
              Home
            </Link>
            <Link
              to="/ecosight"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700/50 transition-colors duration-300 transform hover:translate-x-1"
              onClick={() => setIsOpen(false)}
            >
              Eco Sight
            </Link>
            <Link
              to="/ecoactive"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700/50 transition-colors duration-300 transform hover:translate-x-1"
              onClick={() => setIsOpen(false)}
            >
              Eco Active
            </Link>
            <Link
              to="/ecoquest"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700/50 transition-colors duration-300 transform hover:translate-x-1"
              onClick={() => setIsOpen(false)}
            >
              Eco Quest
            </Link>
            <Link
              to="/leaderboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700/50 transition-colors duration-300 transform hover:translate-x-1"
              onClick={() => setIsOpen(false)}
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
