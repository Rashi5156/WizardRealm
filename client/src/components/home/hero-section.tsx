import React, { useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/useTheme";
import { Wand2 } from "lucide-react";

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Create sparkle effect
    const createSparkles = () => {
      const particles = document.getElementById('particles');
      if (!particles) return;
      
      // Clear existing sparkles
      particles.innerHTML = '';
      
      for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('magic-sparkle');
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparkle.style.animationDuration = `${1 + Math.random() * 3}s`;
        particles.appendChild(sparkle);
      }
    };
    
    createSparkles();
    
    // Clean up
    return () => {
      const particles = document.getElementById('particles');
      if (particles) {
        particles.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div 
        className={`absolute inset-0 bg-hogwarts bg-cover bg-center bg-no-repeat ${
          isDark ? "opacity-70" : "opacity-90"
        }`}
      ></div>
      <div 
        className={`absolute inset-0 bg-wizardDark ${
          isDark ? "opacity-40" : "opacity-10"
        }`}
      ></div>
      <div 
        className={`absolute inset-0 bg-stars bg-cover bg-center bg-fixed ${
          isDark ? "opacity-50" : "opacity-10"
        }`}
      ></div>
      
      {/* Floating Particles Effect */}
      <div id="particles" className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-float">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-gold mb-4 tracking-wide">
          Welcome to the Wizarding World
        </h1>
        <p className={`text-lg md:text-2xl mb-8 font-light max-w-2xl mx-auto ${
          isDark ? "text-parchment" : "text-wizardDark"
        }`}>
          Explore the magic of Harry Potter and begin your magical journey at Hogwarts School of Witchcraft and Wizardry
        </p>
        <Link href="/characters">
          <a className="inline-flex px-8 py-4 rounded-full bg-gryffindor hover:bg-gryffindor/90 text-parchment font-display text-lg font-bold tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 items-center mx-auto group">
            <span>Begin Your Journey</span>
            <Wand2 className="ml-3 transition-transform duration-300 group-hover:rotate-12" />
          </a>
        </Link>
      </div>
    </div>
  );
}
