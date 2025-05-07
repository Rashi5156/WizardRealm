import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Characters endpoints
  app.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getAllCharacters();
      res.json(characters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch characters" });
    }
  });
  
  app.get("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }
      
      const character = await storage.getCharacterById(id);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      
      res.json(character);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch character" });
    }
  });
  
  app.get("/api/characters/house/:house", async (req, res) => {
    try {
      const house = req.params.house;
      const characters = await storage.getCharactersByHouse(house);
      res.json(characters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch characters by house" });
    }
  });
  
  // Houses endpoints
  app.get("/api/houses", async (req, res) => {
    try {
      const houses = await storage.getAllHouses();
      res.json(houses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch houses" });
    }
  });
  
  app.get("/api/houses/:name", async (req, res) => {
    try {
      const name = req.params.name;
      const house = await storage.getHouseByName(name);
      if (!house) {
        return res.status(404).json({ message: "House not found" });
      }
      
      const houseDetails = await storage.getHouseQuizResultDetails(name);
      res.json(houseDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch house details" });
    }
  });
  
  // Spells endpoints
  app.get("/api/spells", async (req, res) => {
    try {
      const spells = await storage.getAllSpells();
      res.json(spells);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch spells" });
    }
  });
  
  app.get("/api/spells/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid spell ID" });
      }
      
      const spell = await storage.getSpellById(id);
      if (!spell) {
        return res.status(404).json({ message: "Spell not found" });
      }
      
      res.json(spell);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch spell" });
    }
  });
  
  // Quiz endpoints
  app.get("/api/quiz/questions", async (req, res) => {
    try {
      const questions = await storage.getHouseQuizQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });
  
  app.post("/api/quiz/result", async (req, res) => {
    try {
      const schema = z.object({
        answers: z.array(z.string())
      });
      
      const { answers } = schema.parse(req.body);
      
      if (!answers || answers.length !== 5) {
        return res.status(400).json({ message: "Invalid quiz answers" });
      }
      
      const house = await storage.calculateHouseQuizResult(answers);
      res.json({ house });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate quiz result" });
    }
  });
  
  // Resources endpoints
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getExternalResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
