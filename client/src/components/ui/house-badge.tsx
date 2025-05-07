import React, { ReactNode } from "react";

interface HouseBadgeProps {
  house: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  children: ReactNode;
  className?: string;
}

export default function HouseBadge({ house, children, className = "" }: HouseBadgeProps) {
  const textColor = house === "hufflepuff" ? "text-wizardDark" : "text-parchment";
  
  return (
    <div className={`bg-${house} rounded-lg p-4 shadow-lg text-center ${textColor} ${className}`}>
      {children}
    </div>
  );
}
