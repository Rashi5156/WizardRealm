import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowRight, HardHat, RefreshCcw, Home, 
  Flame, BookOpen, Leaf, CircleUser
} from "lucide-react";
import { HouseQuizQuestion, HouseQuizResult } from "@shared/schema";

export default function SortingHat() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [houseResult, setHouseResult] = useState("");

  // Fetch quiz questions
  const { data: questions, isLoading: questionsLoading } = useQuery<HouseQuizQuestion[]>({
    queryKey: ['/api/quiz/questions'],
  });

  // Fetch houses data for the intro
  const { data: houses, isLoading: housesLoading } = useQuery<any[]>({
    queryKey: ['/api/houses'],
  });

  const startQuiz = () => {
    setQuizActive(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setHouseResult("");
  };

  const submitAnswer = async (choice: string) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      try {
        const response = await fetch('/api/quiz/result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        });
        
        if (!response.ok) throw new Error('Failed to calculate quiz result');
        
        const result = await response.json();
        setHouseResult(result.house);
        setShowResult(true);
      } catch (error) {
        console.error('Error calculating quiz result:', error);
        alert('Something went wrong with the quiz. Please try again.');
      }
    }
  };

  // Quiz Introduction
  if (!quizActive && !showResult) {
    return (
      <div className="relative py-20 px-4">
        <div 
          className={`absolute inset-0 bg-stars bg-cover bg-center bg-fixed ${
            isDark ? "opacity-50" : "opacity-10"
          }`}
        ></div>
        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold mb-6">Which Hogwarts House Are You?</h1>
          <p className={`text-lg mb-12 max-w-2xl mx-auto ${
            isDark ? "text-parchment/90" : "text-wizard-dark/90"
          }`}>
            "There's nothing hidden in your head the Sorting Hat can't see..."<br />
            Take this quiz to discover which of the four Hogwarts houses you truly belong to!
          </p>
          
          {housesLoading ? (
            <p>Loading houses information...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {houses?.map((house) => (
                <div 
                  key={house.id}
                  className={`bg-${house.name.toLowerCase()} rounded-lg p-4 shadow-lg text-center ${
                    house.name.toLowerCase() === 'hufflepuff' ? 'text-wizard-dark' : 'text-parchment'
                  }`}
                >
                  <img 
                    src={house.crestUrl} 
                    alt={`${house.name} Crest`} 
                    className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
                  />
                  <h2 className="font-display text-xl">{house.name}</h2>
                  <p className={`text-sm mt-2 ${
                    house.name.toLowerCase() === 'hufflepuff' ? 'text-wizardDark/80' : 'text-parchment/80'
                  }`}>
                    {house.traits}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          <button 
            onClick={startQuiz}
            className="px-8 py-4 rounded-full bg-gold hover:bg-gold/90 text-wizardDark font-display text-lg font-bold tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto"
          >
            <HardHat className="mr-3" />
            <span>Start Sorting Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  // Quiz Questions
  if (quizActive && !showResult) {
    if (questionsLoading) {
      return <div className="container mx-auto px-4 py-12 text-center">Loading quiz questions...</div>;
    }

    const currentQuestionData = questions?.[currentQuestion] as HouseQuizQuestion;

    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Progress Bar */}
        <div className="w-full bg-wizardLight rounded-full h-2.5 mb-8">
          <div 
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
              currentQuestion === 0 ? 'bg-gryffindor' :
              currentQuestion === 1 ? 'bg-slytherin' :
              currentQuestion === 2 ? 'bg-hufflepuff' :
              currentQuestion === 3 ? 'bg-ravenclaw' :
              'bg-gold'
            }`}
            style={{ width: `${(currentQuestion + 1) * 20}%` }}
          ></div>
        </div>
        
        {/* Question */}
        <div 
          className={`bg-wizard-light rounded-lg p-6 shadow-lg ${
            isDark ? "bg-wizard-light" : "bg-white/90 border border-wizard-dark/10"
          }`}
        >
          <h2 className="font-display text-2xl text-gold mb-6">
            {currentQuestion + 1}. {currentQuestionData?.question}
          </h2>
          
          <div className="space-y-4">
            {currentQuestionData?.options.map((option, index) => {
              const letter = String.fromCharCode(97 + index); // 'a', 'b', 'c', 'd'
              const houseStyles = {
                a: currentQuestion % 4 === 0 ? 'gryffindor' : 
                   currentQuestion % 4 === 1 ? 'slytherin' : 
                   currentQuestion % 4 === 2 ? 'hufflepuff' : 'ravenclaw',
                b: currentQuestion % 4 === 0 ? 'hufflepuff' : 
                   currentQuestion % 4 === 1 ? 'ravenclaw' : 
                   currentQuestion % 4 === 2 ? 'gryffindor' : 'slytherin',
                c: currentQuestion % 4 === 0 ? 'ravenclaw' : 
                   currentQuestion % 4 === 1 ? 'gryffindor' : 
                   currentQuestion % 4 === 2 ? 'slytherin' : 'hufflepuff',
                d: currentQuestion % 4 === 0 ? 'slytherin' : 
                   currentQuestion % 4 === 1 ? 'hufflepuff' : 
                   currentQuestion % 4 === 2 ? 'ravenclaw' : 'gryffindor',
              };
              
              const houseStyle = houseStyles[letter as keyof typeof houseStyles];
              const textColor = houseStyle === 'hufflepuff' ? 'text-wizard-dark' : 'text-parchment';
              
              return (
                <button 
                  key={letter}
                  onClick={() => submitAnswer(letter)}
                  className={`w-full text-left p-4 rounded-lg transition-colors duration-300 flex items-center ${
                    isDark 
                      ? `hover:bg-${houseStyle}/30 bg-wizard-dark/30` 
                      : `hover:bg-${houseStyle}/10 bg-wizard-dark/5`
                  }`}
                >
                  <span className={`bg-${houseStyle} ${textColor} h-8 w-8 rounded-full flex items-center justify-center mr-3`}>
                    {letter.toUpperCase()}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Quiz Results
  if (showResult) {
    // Fetch specific house result data
    const { data: resultData, isLoading: resultLoading } = useQuery<HouseQuizResult>({
      queryKey: [`/api/houses/${houseResult.toLowerCase()}`],
      enabled: !!houseResult,
    });

    if (resultLoading) {
      return <div className="container mx-auto px-4 py-12 text-center">Loading your result...</div>;
    }

    if (!resultData) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Something went wrong. Please try again.</p>
          <button 
            onClick={startQuiz}
            className="px-6 py-3 mt-4 rounded-full bg-gold hover:bg-gold/90 text-wizardDark font-display font-bold"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <div 
          className={`bg-wizard-light rounded-lg overflow-hidden shadow-xl ${
            isDark 
              ? "bg-wizard-light" 
              : `bg-white/90 border border-${houseResult.toLowerCase()}/20`
          }`}
        >
          <div className={`bg-${houseResult.toLowerCase()} h-8`}></div>
          <div className="p-8">
            <div 
              className={`w-24 h-24 rounded-full bg-${houseResult.toLowerCase()} ${
                houseResult.toLowerCase() === 'hufflepuff' ? 'text-wizard-dark' : 'text-parchment'
              } mx-auto flex items-center justify-center mb-6`}
            >
              {resultData.icon === 'fire' && <Flame size={48} />}
              {resultData.icon === 'book-open' && <BookOpen size={48} />}
              {resultData.icon === 'seedling' && <Leaf size={48} />}
              {resultData.icon === 'snake' && <CircleUser size={48} />}
            </div>
            <h2 className="font-display text-4xl text-gold mb-4">
              You belong in {houseResult.toUpperCase()}!
            </h2>
            <p className={`text-lg mb-6 ${
              isDark ? "text-parchment/90" : "text-wizard-dark/90"
            }`}>
              "{resultData.verse}"
            </p>
            <p className={`mb-8 ${
              isDark ? "text-parchment/80" : "text-wizard-dark/80"
            }`}>
              {resultData.description}
            </p>
            <button 
              onClick={startQuiz}
              className={`px-6 py-3 rounded-full bg-${houseResult.toLowerCase()} hover:bg-${houseResult.toLowerCase()}/90 ${
                houseResult.toLowerCase() === 'hufflepuff' ? 'text-wizard-dark' : 'text-parchment'
              } font-display font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 mr-4`}
            >
              <RefreshCcw className="inline mr-2" size={16} />
              Take Quiz Again
            </button>
            <a 
              href="/"
              className="px-6 py-3 rounded-full bg-gold hover:bg-gold/90 text-wizard-dark font-display font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 inline-block"
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
