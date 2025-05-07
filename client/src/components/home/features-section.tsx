import React from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/useTheme";
import { HardHat, Wand2, UserCircle, ArrowRight } from "lucide-react";

export default function FeaturesSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const features = [
    {
      icon: <UserCircle className="text-2xl" />,
      title: "Meet the Characters",
      description: "Explore detailed profiles of your favorite witches and wizards from the Harry Potter universe.",
      link: "/characters",
      bgColor: "bg-gryffindor",
    },
    {
      icon: <HardHat className="text-2xl" />,
      title: "Sorting Hat Quiz",
      description: "Discover which Hogwarts house you truly belong to with our enchanted sorting hat quiz.",
      link: "/quiz",
      bgColor: "bg-hufflepuff",
      textColor: "text-wizard-dark",
    },
    {
      icon: <Wand2 className="text-2xl" />,
      title: "Spell Challenge",
      description: "Test your magical knowledge with our spell identification game. Learn as you play!",
      link: "/games",
      bgColor: "bg-ravenclaw",
    },
  ];
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="font-display text-3xl text-center mb-16 text-gold">Discover the Magic</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
              isDark 
                ? "bg-wizard-light" 
                : "bg-white/90 border border-wizard-dark/10"
            }`}
          >
            <div className={`w-16 h-16 ${feature.bgColor} rounded-full mb-4 flex items-center justify-center ${feature.textColor || "text-parchment"} mx-auto`}>
              {feature.icon}
            </div>
            <h3 className="font-display text-center text-xl mb-3 text-gold">{feature.title}</h3>
            <p className={`text-center ${
              isDark ? "text-parchment/90" : "text-wizard-dark/90"
            }`}>
              {feature.description}
            </p>
            <div className="mt-5 text-center">
              <Link href={feature.link}>
                <span className="text-gold hover:text-hufflepuff transition-colors duration-300 font-display cursor-pointer inline-flex items-center">
                  {feature.title === "Sorting Hat Quiz" 
                    ? "Take the Quiz " 
                    : feature.title === "Spell Challenge" 
                      ? "Play Now " 
                      : "View Characters "}
                  <ArrowRight className="ml-1" size={16} />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
