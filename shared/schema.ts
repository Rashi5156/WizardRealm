import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model (from template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Characters
export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  house: text("house").notNull(),
  wand: text("wand").notNull(),
  patronus: text("patronus"),
  description: text("description").notNull(),
  quote: text("quote").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertCharacterSchema = createInsertSchema(characters);
export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Character = typeof characters.$inferSelect;

// Houses
export const houses = pgTable("houses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  traits: text("traits").notNull(),
  crestUrl: text("crest_url").notNull(),
  founder: text("founder").notNull(),
  element: text("element").notNull(),
  colors: text("colors").notNull(),
  animal: text("animal").notNull(),
  ghost: text("ghost").notNull(),
});

export const insertHouseSchema = createInsertSchema(houses);
export type InsertHouse = z.infer<typeof insertHouseSchema>;
export type House = typeof houses.$inferSelect;

// Spells
export const spells = pgTable("spells", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  effect: text("effect").notNull(),
  type: text("type").notNull(),
  light: text("light"),
  difficulty: integer("difficulty"),
});

export const insertSpellSchema = createInsertSchema(spells);
export type InsertSpell = z.infer<typeof insertSpellSchema>;
export type Spell = typeof spells.$inferSelect;

// External Resources
export interface ExternalResource {
  name: string;
  url: string;
  description: string;
  icon: string;
  color: string;
}

// House Quiz
export interface HouseQuizQuestion {
  question: string;
  options: string[];
}

export interface HouseQuizResult {
  house: string;
  verse: string;
  icon: string;
  description: string;
}
