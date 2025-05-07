import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/hooks/useTheme";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isDark = theme === "dark";

  const navItems = [
    { path: "/", label: "Home", color: "gryffindor" },
    { path: "/characters", label: "Characters", color: "slytherin" },
    { path: "/quiz", label: "House Quiz", color: "hufflepuff" },
    { path: "/games", label: "Spell Game", color: "ravenclaw" },
    { path: "/extras", label: "Extras", color: "gold" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 shadow-md px-4 py-3 border-b transition-colors duration-300 ${
        isDark 
          ? "bg-wizardDark border-gold/30" 
          : "bg-parchment border-wizardDark/20"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
            alt="Hogwarts Crest"
            className="h-12 w-auto mr-3"
          />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold">
            Hogwarts
            <span className={`hidden sm:inline ${isDark ? "text-parchment" : "text-wizardDark"}`}>
              {" "}Hub
            </span>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <span 
                className={`nav-item font-display tracking-wide transition-all duration-300 relative cursor-pointer ${
                  location === item.path 
                    ? "text-gold font-semibold" 
                    : "hover:text-gold"
                }`}
              >
                {item.label}
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-${item.color} transform scale-x-0 transition-transform origin-left duration-300 ${
                    location === item.path ? "scale-x-100" : ""
                  }`}
                ></span>
              </span>
            </Link>
          ))}
          
          <ThemeToggle className="ml-4" />
        </div>
        
        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle className="mr-2" />
          
          <button
            onClick={toggleMenu}
            className={`p-2 focus:outline-none ${isDark ? "text-parchment" : "text-wizardDark"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div 
              className={`absolute right-4 top-16 w-48 py-2 rounded-md shadow-xl z-50 ${
                isDark 
                  ? "bg-wizardLight border border-gold/30" 
                  : "bg-parchment border border-wizardDark/20"
              }`}
            >
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    onClick={closeMenu}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gold/20 transition-colors duration-150 block cursor-pointer ${
                      location === item.path ? "font-semibold text-gold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
