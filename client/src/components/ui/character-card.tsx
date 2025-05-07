import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Character } from "@shared/schema";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="flip-card h-96 perspective-1000 w-full cursor-pointer mx-auto" style={{ maxWidth: '320px' }}>
      <div className="flip-card-inner relative w-full h-full">
        {/* Card Front */}
        <div 
          className={`flip-card-front absolute w-full h-full rounded-lg overflow-hidden shadow-lg ${
            isDark ? "bg-wizard-light" : "bg-parchment"
          }`}
        >
          <img 
            src={character.imageUrl} 
            alt={character.name} 
            className="w-full h-3/4 object-cover object-center"
          />
          <div className={`p-4 border-t-4 border-${character.house.toLowerCase()} h-1/4 flex flex-col justify-center`}>
            <h3 className="font-display text-xl font-semibold text-gold">{character.name}</h3>
            <p className={`text-sm ${isDark ? "text-parchment/80" : "text-wizard-dark/80"}`}>
              {character.title}
            </p>
          </div>
        </div>
        
        {/* Card Back */}
        <div 
          className={`flip-card-back absolute w-full h-full rounded-lg overflow-hidden shadow-lg p-5 
            ${isDark ? `bg-${character.house.toLowerCase()}` : `bg-${character.house.toLowerCase()}/90`}
            ${character.house.toLowerCase() === 'hufflepuff' ? 'text-wizard-dark' : 'text-parchment'}`}
        >
          <h3 className="font-display text-xl font-semibold text-gold mb-3">{character.name}</h3>
          <div className={`text-sm space-y-2 ${character.house.toLowerCase() === 'hufflepuff' ? 'text-wizardDark' : 'text-parchment'}`}>
            <p><span className="font-bold">House:</span> {character.house}</p>
            <p><span className="font-bold">Wand:</span> {character.wand}</p>
            <p><span className="font-bold">Patronus:</span> {character.patronus || 'Unknown'}</p>
            <p className="mt-3">{character.description}</p>
            <p className="text-xs italic mt-3">
              "{character.quote}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
