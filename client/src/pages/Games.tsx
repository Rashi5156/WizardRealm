import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import SpellChallenge from "@/components/game/spell-challenge";
import { Helmet } from "react-helmet";

export default function Games() {
  return (
    <MainLayout>
      <Helmet>
        <title>Magical Spell Challenge - Hogwarts Hub</title>
        <meta name="description" content="Test your knowledge of spells from the Harry Potter universe. Match spells with their effects and prove your magical expertise." />
        <meta property="og:title" content="Harry Potter Spell Challenge - Hogwarts Hub" />
        <meta property="og:description" content="Can you match famous spells like Expelliarmus and Wingardium Leviosa with their correct effects?" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <SpellChallenge />
    </MainLayout>
  );
}
