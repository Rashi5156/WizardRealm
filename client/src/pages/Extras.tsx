import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { ExternalResource } from "@shared/schema";
import { Globe, Ticket, HardHat, Film, Newspaper, BookOpen } from "lucide-react";
import { FaRedditAlien } from "react-icons/fa";
import { Helmet } from "react-helmet";

export default function Extras() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Fetch resources data
  const { data: resources, isLoading: resourcesLoading } = useQuery<{
    links: ExternalResource[];
    fan: ExternalResource[];
  }>({
    queryKey: ['/api/resources'],
  });

  // Icons map
  const getIcon = (icon: string, size = 18) => {
    switch (icon) {
      case 'globe': return <Globe size={size} />;
      case 'ticket': return <Ticket size={size} />;
      case 'hat': return <HardHat size={size} />;
      case 'film': return <Film size={size} />;
      case 'reddit': return <FaRedditAlien size={size} />;
      case 'news': return <Newspaper size={size} />;
      case 'book': return <BookOpen size={size} />;
      default: return <Globe size={size} />;
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Magical Extras - Hogwarts Hub</title>
        <meta name="description" content="Explore more of the Wizarding World with trailers, music, official resources, and fan community links. Immerse yourself in the magic of Harry Potter." />
        <meta property="og:title" content="Harry Potter Extras - Official Resources &amp; Fan Community" />
        <meta property="og:description" content="Watch trailers, listen to music, and connect with the worldwide Harry Potter fan community." />
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
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold mb-4">Magical Extras</h1>
          <p className={`max-w-2xl mx-auto text-lg ${
            isDark ? "text-parchment/90" : "text-wizardDark/90"
          }`}>
            Explore more of the Wizarding World with these magical resources.
          </p>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Movie Trailers */}
          <div 
            className={`bg-wizardLight rounded-lg shadow-lg overflow-hidden ${
              isDark ? "bg-wizardLight" : "bg-white/90 border border-wizardDark/10"
            }`}
          >
            <div className="p-6">
              <h2 className="font-display text-2xl text-gold mb-4">Movie Trailers</h2>
              <p className={`mb-6 ${
                isDark ? "text-parchment/90" : "text-wizardDark/90"
              }`}>
                Relive the magic with trailers from the Harry Potter film series.
              </p>
              
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/VyHV0BRtdxo" 
                  title="Harry Potter and the Philosopher's Stone Official Trailer"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/jQ_2tpWMQ4o" 
                  title="Harry Potter and the Deathly Hallows Part 2 Official Trailer"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Official Links */}
          <div 
            className={`bg-wizardLight rounded-lg shadow-lg overflow-hidden ${
              isDark ? "bg-wizardLight" : "bg-white/90 border border-wizardDark/10"
            }`}
          >
            <div className="p-6">
              <h2 className="font-display text-2xl text-gold mb-4">Official Resources</h2>
              <p className={`mb-6 ${
                isDark ? "text-parchment/90" : "text-wizardDark/90"
              }`}>
                Explore official Harry Potter websites and resources.
              </p>
              
              {resourcesLoading ? (
                <p>Loading resources...</p>
              ) : (
                <div className="space-y-4">
                  {resources?.links.map((resource, index) => (
                    <a 
                      key={index}
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center p-4 rounded-lg hover:bg-gold/10 transition-colors duration-300 ${
                        isDark ? "bg-wizardDark/30" : "bg-wizardDark/5"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-${resource.color} flex items-center justify-center mr-4 ${
                        resource.color === 'hufflepuff' ? 'text-wizardDark' : 'text-parchment'
                      }`}>
                        {getIcon(resource.icon)}
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-gold">{resource.name}</h3>
                        <p className={`text-sm ${
                          isDark ? "text-parchment/80" : "text-wizardDark/80"
                        }`}>
                          {resource.description}
                        </p>
                      </div>
                      <span className={`ml-auto ${
                        isDark ? "text-parchment/50" : "text-wizardDark/50"
                      }`}>↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Music Section */}
        <div 
          className={`bg-wizardLight rounded-lg shadow-lg overflow-hidden mb-16 ${
            isDark ? "bg-wizardLight" : "bg-white/90 border border-wizardDark/10"
          }`}
        >
          <div className="p-6">
            <h2 className="font-display text-2xl text-gold mb-4">Music from the Wizarding World</h2>
            <p className={`mb-6 ${
              isDark ? "text-parchment/90" : "text-wizardDark/90"
            }`}>
              Immerse yourself in the magical melodies from the Harry Potter films.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className={`p-4 rounded-lg ${
                  isDark ? "bg-wizardDark/30" : "bg-wizardDark/5"
                }`}
              >
                <h3 className="font-display text-xl text-gold mb-3">Hedwig's Theme</h3>
                <p className={`mb-4 text-sm ${
                  isDark ? "text-parchment/80" : "text-wizardDark/80"
                }`}>
                  The iconic main theme of the Harry Potter series composed by John Williams.
                </p>
                <iframe 
                  className="w-full rounded" 
                  height="80" 
                  src="https://www.youtube.com/embed/wtHra9tFISY" 
                  title="Hedwig's Theme from Harry Potter"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              
              <div 
                className={`p-4 rounded-lg ${
                  isDark ? "bg-wizardDark/30" : "bg-wizardDark/5"
                }`}
              >
                <h3 className="font-display text-xl text-gold mb-3">Harry Potter Suite</h3>
                <p className={`mb-4 text-sm ${
                  isDark ? "text-parchment/80" : "text-wizardDark/80"
                }`}>
                  A beautiful orchestral suite featuring the best music from the films.
                </p>
                <iframe 
                  className="w-full rounded" 
                  height="80" 
                  src="https://www.youtube.com/embed/MtBwYbS_yw4" 
                  title="Harry Potter Orchestral Suite"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fan Community */}
        <div 
          className={`bg-wizardLight rounded-lg shadow-lg overflow-hidden ${
            isDark ? "bg-wizardLight" : "bg-white/90 border border-wizardDark/10"
          }`}
        >
          <div className="p-6">
            <h2 className="font-display text-2xl text-gold mb-4">Fan Community</h2>
            <p className={`mb-6 ${
              isDark ? "text-parchment/90" : "text-wizardDark/90"
            }`}>
              Connect with other Harry Potter fans around the world.
            </p>
            
            {resourcesLoading ? (
              <p>Loading community links...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {resources?.fan.map((resource, index) => (
                  <a 
                    key={index}
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-4 rounded-lg hover:bg-gold/10 transition-colors duration-300 flex flex-col items-center text-center ${
                      isDark ? "bg-wizardDark/30" : "bg-wizardDark/5"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-${resource.color} flex items-center justify-center mb-3 ${
                      resource.color === 'hufflepuff' ? 'text-wizardDark' : 'text-parchment'
                    }`}>
                      {getIcon(resource.icon)}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-gold">{resource.name}</h3>
                    <p className={`text-sm mt-1 ${
                      isDark ? "text-parchment/80" : "text-wizardDark/80"
                    }`}>
                      {resource.description}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
