import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import SortingHat from "@/components/quiz/sorting-hat";
import { Helmet } from "react-helmet";

export default function Quiz() {
  return (
    <MainLayout>
      <Helmet>
        <title>Sorting Hat Quiz - Hogwarts Hub</title>
        <meta name="description" content="Discover which Hogwarts house you truly belong to with our interactive Sorting Hat quiz. Are you brave, ambitious, wise, or loyal?" />
        <meta property="og:title" content="Which Hogwarts House Are You? - Sorting Hat Quiz" />
        <meta property="og:description" content="Take the magical Sorting Hat quiz to find your true Hogwarts house." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <SortingHat />
    </MainLayout>
  );
}
