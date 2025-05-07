import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import CharacterCard from "@/components/ui/character-card";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { Character } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function Characters() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Fetch character data
  const { data: characters, isLoading } = useQuery<Character[]>({
    queryKey: ['/api/characters'],
  });

  return (
    <MainLayout>
      <Helmet>
        <title>Characters - Hogwarts Hub</title>
        <meta name="description" content="Meet the extraordinary witches and wizards from the Harry Potter universe. Learn about their houses, wands, patronuses, and more." />
        <meta property="og:title" content="Harry Potter Character Profiles - Hogwarts Hub" />
        <meta property="og:description" content="Detailed profiles of your favorite characters from the Wizarding World." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Page Header */}
      <div className="relative py-20 px-4 text-center">
        <div 
          className={`absolute inset-0 bg-stars bg-cover bg-center bg-fixed ${
            isDark ? "opacity-50" : "opacity-10"
          }`}
        ></div>
        <div className="relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold mb-4">
            Characters of the Wizarding World
          </h1>
          <p className={`max-w-2xl mx-auto text-lg ${
            isDark ? "text-parchment/90" : "text-wizardDark/90"
          }`}>
            Meet the extraordinary witches and wizards who shaped the magical history of Harry Potter's world.
          </p>
        </div>
      </div>
      
      {/* Character Cards */}
      <div className="container mx-auto px-4 pb-16">
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full font-display text-sm transition-colors duration-300 ${
              activeFilter === 'all' 
                ? 'bg-gold text-wizardDark' 
                : `bg-wizardLight text-parchment hover:bg-gold/20`
            }`}
          >
            All Characters
          </button>
          <button 
            onClick={() => setActiveFilter('gryffindor')}
            className={`px-4 py-2 rounded-full font-display text-sm transition-colors duration-300 ${
              activeFilter === 'gryffindor' 
                ? 'bg-gryffindor text-parchment' 
                : `bg-wizardLight text-parchment hover:bg-gryffindor/50`
            }`}
          >
            Gryffindor
          </button>
          <button 
            onClick={() => setActiveFilter('slytherin')}
            className={`px-4 py-2 rounded-full font-display text-sm transition-colors duration-300 ${
              activeFilter === 'slytherin' 
                ? 'bg-slytherin text-parchment' 
                : `bg-wizardLight text-parchment hover:bg-slytherin/50`
            }`}
          >
            Slytherin
          </button>
          <button 
            onClick={() => setActiveFilter('hufflepuff')}
            className={`px-4 py-2 rounded-full font-display text-sm transition-colors duration-300 ${
              activeFilter === 'hufflepuff' 
                ? 'bg-hufflepuff text-wizardDark' 
                : `bg-wizardLight text-parchment hover:bg-hufflepuff/50`
            }`}
          >
            Hufflepuff
          </button>
          <button 
            onClick={() => setActiveFilter('ravenclaw')}
            className={`px-4 py-2 rounded-full font-display text-sm transition-colors duration-300 ${
              activeFilter === 'ravenclaw' 
                ? 'bg-ravenclaw text-parchment' 
                : `bg-wizardLight text-parchment hover:bg-ravenclaw/50`
            }`}
          >
            Ravenclaw
          </button>
        </div>
        
        {isLoading ? (
          <p className="text-center">Loading character profiles...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {characters?.filter(character => {
              if (activeFilter === 'all') return true;
              return character.house.toLowerCase() === activeFilter;
            }).map(character => (
              <CharacterCard 
                key={character.id} 
                character={character} 
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
