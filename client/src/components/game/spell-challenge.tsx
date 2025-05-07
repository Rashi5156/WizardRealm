import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { Wand2, RefreshCcw, Home } from "lucide-react";

interface SpellGame {
  score: number;
  currentSpell: { name: string; effect: string } | null;
  options: string[];
  level: number;
  maxLevel: number;
  completed: boolean;
}

export default function SpellChallenge() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [gameActive, setGameActive] = useState(false);
  const [game, setGame] = useState<SpellGame>({
    score: 0,
    currentSpell: null,
    options: [],
    level: 1,
    maxLevel: 5,
    completed: false
  });

  // Fetch spells data
  const { data: spells, isLoading } = useQuery({
    queryKey: ['/api/spells'],
  });

  const startGame = () => {
    setGameActive(true);
    setGame({
      score: 0,
      currentSpell: null,
      options: [],
      level: 1,
      maxLevel: 5,
      completed: false
    });
  };

  useEffect(() => {
    if (gameActive && spells && spells.length > 0) {
      nextSpell();
    }
  }, [gameActive, spells]);

  const nextSpell = () => {
    if (!spells || spells.length === 0) return;
    
    // Select random spell for the question
    const randomIndex = Math.floor(Math.random() * spells.length);
    const selectedSpell = spells[randomIndex];
    
    // Generate options (including the correct answer)
    let options = [selectedSpell.effect];
    while (options.length < 4) {
      const randomOption = spells[Math.floor(Math.random() * spells.length)].effect;
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    
    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);
    
    setGame(prev => ({
      ...prev,
      currentSpell: selectedSpell,
      options
    }));
  };

  const checkAnswer = (answer: string) => {
    if (!game.currentSpell) return;
    
    if (answer === game.currentSpell.effect) {
      // Correct answer
      setGame(prev => {
        const newScore = prev.score + 10;
        
        if (prev.level < prev.maxLevel) {
          // Continue to next level
          return {
            ...prev,
            score: newScore,
            level: prev.level + 1
          };
        } else {
          // Game completed
          return {
            ...prev,
            score: newScore,
            completed: true
          };
        }
      });
      
      if (game.level < game.maxLevel) {
        nextSpell();
      }
    } else {
      // Wrong answer
      setGame(prev => ({
        ...prev,
        score: Math.max(0, prev.score - 5) // Ensure score doesn't go below 0
      }));
    }
  };

  // Game introduction
  if (!gameActive && !game.completed) {
    return (
      <div className="relative py-20 px-4">
        <div 
          className={`absolute inset-0 bg-stars bg-cover bg-center bg-fixed ${
            isDark ? "opacity-50" : "opacity-10"
          }`}
        ></div>
        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold mb-6">Spell Challenge</h1>
          <p className={`text-lg mb-12 max-w-2xl mx-auto ${
            isDark ? "text-parchment/90" : "text-wizardDark/90"
          }`}>
            Test your knowledge of magical spells from the Wizarding World!<br />
            Match each spell with its correct effect to earn points.
          </p>
          
          <div 
            className={`bg-wizardLight p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-12 ${
              isDark ? "bg-wizardLight" : "bg-white/90"
            }`}
          >
            <h2 className="font-display text-2xl text-gold mb-4">How to Play</h2>
            <ul className={`text-left space-y-3 pl-5 ${
              isDark ? "text-parchment/90" : "text-wizardDark/90"
            }`}>
              <li className="flex">
                <Wand2 className="text-gold mr-3 mt-1 flex-shrink-0" size={18} />
                <span>You'll be shown a spell name from the Harry Potter universe</span>
              </li>
              <li className="flex">
                <Wand2 className="text-gold mr-3 mt-1 flex-shrink-0" size={18} />
                <span>Select the correct effect of the spell from multiple choices</span>
              </li>
              <li className="flex">
                <Wand2 className="text-gold mr-3 mt-1 flex-shrink-0" size={18} />
                <span>Earn 10 points for each correct answer</span>
              </li>
              <li className="flex">
                <Wand2 className="text-gold mr-3 mt-1 flex-shrink-0" size={18} />
                <span>Lose 5 points for each incorrect answer</span>
              </li>
              <li className="flex">
                <Wand2 className="text-gold mr-3 mt-1 flex-shrink-0" size={18} />
                <span>Complete all 5 levels to master your magical knowledge!</span>
              </li>
            </ul>
          </div>
          
          <button 
            onClick={startGame}
            className="px-8 py-4 rounded-full bg-ravenclaw hover:bg-ravenclaw/90 text-parchment font-display text-lg font-bold tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto"
            disabled={isLoading}
          >
            <Wand2 className="mr-3" />
            <span>{isLoading ? "Loading..." : "Start Spell Challenge"}</span>
          </button>
        </div>
      </div>
    );
  }

  // Game active
  if (gameActive && !game.completed) {
    if (isLoading || !game.currentSpell) {
      return <div className="container mx-auto px-4 py-12 text-center">Loading game...</div>;
    }

    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-display text-gold">
            <span>Level: </span>
            <span>{game.level}</span>
            <span>/</span>
            <span>{game.maxLevel}</span>
          </div>
          <div className="text-xl font-display text-gold">
            <span>Score: </span>
            <span>{game.score}</span>
          </div>
        </div>
        
        {/* Spell Question */}
        <div 
          className={`bg-wizardLight rounded-lg p-6 shadow-lg mb-6 text-center ${
            isDark ? "bg-wizardLight" : "bg-white/90 border border-gold/20"
          }`}
        >
          <h2 className="font-display text-3xl text-gold mb-6">
            {game.currentSpell.name}
          </h2>
          <p className={`mb-8 ${
            isDark ? "text-parchment/90" : "text-wizardDark/90"
          }`}>
            What is the effect of this spell?
          </p>
          
          <div className="space-y-4">
            {game.options.map((option, index) => (
              <button 
                key={index}
                onClick={() => checkAnswer(option)}
                className={`w-full p-4 rounded-lg transition-colors duration-300 text-center ${
                  isDark 
                    ? "hover:bg-ravenclaw/30 bg-wizardDark/30" 
                    : "hover:bg-ravenclaw/10 bg-wizardDark/5"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {/* Wand Animation */}
        <div className="flex justify-center">
          <div className="w-20 h-60 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-40 bg-gradient-to-t from-[#8B4513] to-[#A0522D] rounded-full"></div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-2 h-20 bg-gradient-to-t from-[#A0522D] to-[#D2B48C] rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Game completed
  if (game.completed) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <div 
          className={`bg-wizardLight rounded-lg overflow-hidden shadow-xl ${
            isDark ? "bg-wizardLight" : "bg-white/90 border border-ravenclaw/20"
          }`}
        >
          <div className="bg-ravenclaw h-8"></div>
          <div className="p-8">
            <div className="w-24 h-24 rounded-full bg-ravenclaw text-parchment mx-auto flex items-center justify-center mb-6">
              <Wand2 className="text-4xl" />
            </div>
            <h2 className="font-display text-4xl text-gold mb-4">Challenge Complete!</h2>
            <p className={`text-lg mb-6 ${
              isDark ? "text-parchment/90" : "text-wizardDark/90"
            }`}>
              You've completed the Spell Challenge with a score of <span className="font-bold text-gold">{game.score}</span> points!
            </p>
            <p className={`mb-8 ${
              isDark ? "text-parchment/80" : "text-wizardDark/80"
            }`}>
              {game.score >= 40 ? (
                <span>Outstanding! Professor Flitwick would be impressed by your spell knowledge!</span>
              ) : game.score >= 20 ? (
                <span>Exceeds Expectations! You've shown good knowledge of magical spells.</span>
              ) : (
                <span>Acceptable. With more study at Hogwarts, you'll master these spells in no time!</span>
              )}
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-full bg-ravenclaw hover:bg-ravenclaw/90 text-parchment font-display font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 mr-4"
            >
              <RefreshCcw className="inline mr-2" size={16} />
              Play Again
            </button>
            <a
              href="/"
              className="px-6 py-3 rounded-full bg-gold hover:bg-gold/90 text-wizardDark font-display font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 inline-block"
            >
              <Home className="inline mr-2" size={16} />
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  // This should never happen, but just in case
  return null;
}
