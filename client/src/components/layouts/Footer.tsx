import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <footer 
      className={`py-8 px-4 border-t transition-colors duration-300 ${
        isDark 
          ? "bg-wizard-light border-gold/20" 
          : "bg-parchment/70 border-wizard-dark/10"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
              alt="Hogwarts Crest" 
              className="h-10 w-auto mr-3"
            />
            <div>
              <h2 className="font-display text-xl font-bold text-gold">Hogwarts Hub</h2>
              <p className={`text-xs ${isDark ? "text-parchment/70" : "text-wizard-dark/70"}`}>
                A fan-made Harry Potter experience
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 mb-6 md:mb-0">
            <a href="#" className="text-gold hover:text-hufflepuff transition-colors duration-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gold hover:text-hufflepuff transition-colors duration-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gold hover:text-hufflepuff transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gold hover:text-hufflepuff transition-colors duration-300">
              <Youtube size={20} />
            </a>
          </div>
          
          <p className={`text-sm text-center md:text-right ${isDark ? "text-parchment/70" : "text-wizard-dark/70"}`}>
            This is a fan-made website for educational purposes only.<br />
            Harry Potter © Warner Bros. Entertainment Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
