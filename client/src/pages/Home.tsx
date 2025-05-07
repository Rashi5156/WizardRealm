import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import NewsletterSection from "@/components/home/newsletter-section";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <MainLayout>
      <Helmet>
        <title>Hogwarts Hub - A Harry Potter Fan Experience</title>
        <meta name="description" content="Welcome to Hogwarts Hub - the ultimate fan experience for Harry Potter enthusiasts. Explore character profiles, take the sorting quiz, play magical games, and more!" />
        <meta property="og:title" content="Hogwarts Hub - A Harry Potter Fan Experience" />
        <meta property="og:description" content="Explore the wizarding world, discover your Hogwarts house, and test your magical knowledge." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <HeroSection />
      <FeaturesSection />
      <NewsletterSection />
    </MainLayout>
  );
}
