import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Bird } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would submit this to an API
    alert(`Thanks for subscribing with ${email}! You'll receive owl posts soon.`);
    setEmail("");
  };
  
  return (
    <div className={`py-12 px-4 ${isDark ? "bg-wizard-light" : "bg-parchment/50"}`}>
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl md:text-3xl mb-4 text-gold">Subscribe to Bird Post</h2>
        <p className={`mb-6 max-w-xl mx-auto ${
          isDark ? "text-parchment/90" : "text-wizard-dark/90"
        }`}>
          Sign up for magical updates from the wizarding world, including exclusive content and early access to new features.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input 
            type="email" 
            placeholder="Your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`flex-grow px-4 py-3 rounded-md bg-opacity-20 border focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 ${
              isDark 
                ? "bg-wizard-dark border-gold/30 text-parchment" 
                : "bg-white border-wizard-dark/10 text-wizard-dark"
            }`}
          />
          <Button 
            type="submit" 
            className="px-6 py-3 font-display bg-hufflepuff hover:bg-hufflepuff/90 text-wizard-dark rounded-md transition-colors duration-300 whitespace-nowrap"
          >
            Subscribe <Bird className="ml-2 inline" size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}
