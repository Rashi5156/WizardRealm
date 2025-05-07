import { 
  users, type User, type InsertUser,
  characters, type Character, type InsertCharacter,
  houses, type House, type InsertHouse,
  spells, type Spell, type InsertSpell
} from "@shared/schema";

// Storage interface for all models
export interface IStorage {
  // User methods (from template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Character methods
  getAllCharacters(): Promise<Character[]>;
  getCharacterById(id: number): Promise<Character | undefined>;
  getCharactersByHouse(house: string): Promise<Character[]>;
  
  // House methods
  getAllHouses(): Promise<House[]>;
  getHouseByName(name: string): Promise<House | undefined>;
  
  // Spell methods
  getAllSpells(): Promise<Spell[]>;
  getSpellById(id: number): Promise<Spell | undefined>;
  
  // Quiz methods
  getHouseQuizQuestions(): Promise<any[]>;
  calculateHouseQuizResult(answers: string[]): Promise<string>;
  getHouseQuizResultDetails(house: string): Promise<any>;
  
  // Resources methods
  getExternalResources(): Promise<any>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private characters: Map<number, Character>;
  private houses: Map<number, House>;
  private spells: Map<number, Spell>;
  private nextId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.characters = new Map();
    this.houses = new Map();
    this.spells = new Map();
    this.nextId = {
      users: 1,
      characters: 1,
      houses: 1,
      spells: 1
    };
    
    // Initialize with data
    this.seedData();
  }

  // User methods (from template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Character methods
  async getAllCharacters(): Promise<Character[]> {
    return Array.from(this.characters.values());
  }
  
  async getCharacterById(id: number): Promise<Character | undefined> {
    return this.characters.get(id);
  }
  
  async getCharactersByHouse(house: string): Promise<Character[]> {
    return Array.from(this.characters.values()).filter(
      (character) => character.house.toLowerCase() === house.toLowerCase()
    );
  }
  
  // House methods
  async getAllHouses(): Promise<House[]> {
    return Array.from(this.houses.values());
  }
  
  async getHouseByName(name: string): Promise<House | undefined> {
    return Array.from(this.houses.values()).find(
      (house) => house.name.toLowerCase() === name.toLowerCase()
    );
  }
  
  // Spell methods
  async getAllSpells(): Promise<Spell[]> {
    return Array.from(this.spells.values());
  }
  
  async getSpellById(id: number): Promise<Spell | undefined> {
    return this.spells.get(id);
  }
  
  // Quiz methods
  async getHouseQuizQuestions(): Promise<any[]> {
    // Sample quiz questions
    return [
      {
        question: "You face a dangerous situation. What's your first instinct?",
        options: [
          "Rush in to protect others – danger is worth facing to help someone in need.",
          "Make sure everyone is safe first, then work as a team to address the threat.",
          "Analyze the situation carefully to determine the most effective solution.",
          "Consider all potential personal advantages or disadvantages before acting."
        ]
      },
      {
        question: "What would you most like to be known for?",
        options: [
          "Achieving greatness and being recognized for my accomplishments.",
          "My intelligence and original ideas that advance knowledge.",
          "My courage and willingness to stand up for what's right.",
          "My kindness and fair treatment of others, regardless of status."
        ]
      },
      {
        question: "Which pet would you most likely bring to Hogwarts?",
        options: [
          "A loyal, friendly cat that gets along with everyone.",
          "A brave, protective owl that's not afraid of dangerous deliveries.",
          "A rare, impressive exotic pet that others would admire.",
          "An intelligent animal that can help with your studies."
        ]
      },
      {
        question: "When working on a group project, you are most likely to:",
        options: [
          "Devise the overall concept and research strategy for the group.",
          "Take charge and delegate tasks to make sure the project excels.",
          "Make sure everyone has a voice and feels included in the process.",
          "Motivate the team with enthusiasm and tackle the most challenging parts."
        ]
      },
      {
        question: "Which magical subject would you be most excited to study?",
        options: [
          "Defense Against the Dark Arts – learning to protect yourself and others.",
          "Ancient Runes – deciphering magical languages and symbols.",
          "Herbology – working with magical plants and their properties.",
          "Potions – mastering the subtle science of potion-making to achieve your goals."
        ]
      }
    ];
  }
  
  async calculateHouseQuizResult(answers: string[]): Promise<string> {
    const houses = {
      gryffindor: 0,
      hufflepuff: 0,
      ravenclaw: 0,
      slytherin: 0
    };
    
    // Simple house assignment algorithm
    answers.forEach((answer, index) => {
      if (index === 0) {
        if (answer === 'a') houses.gryffindor++;
        if (answer === 'b') houses.hufflepuff++;
        if (answer === 'c') houses.ravenclaw++;
        if (answer === 'd') houses.slytherin++;
      }
      if (index === 1) {
        if (answer === 'a') houses.slytherin++;
        if (answer === 'b') houses.ravenclaw++;
        if (answer === 'c') houses.gryffindor++;
        if (answer === 'd') houses.hufflepuff++;
      }
      if (index === 2) {
        if (answer === 'a') houses.hufflepuff++;
        if (answer === 'b') houses.gryffindor++;
        if (answer === 'c') houses.slytherin++;
        if (answer === 'd') houses.ravenclaw++;
      }
      if (index === 3) {
        if (answer === 'a') houses.ravenclaw++;
        if (answer === 'b') houses.slytherin++;
        if (answer === 'c') houses.hufflepuff++;
        if (answer === 'd') houses.gryffindor++;
      }
      if (index === 4) {
        if (answer === 'a') houses.gryffindor++;
        if (answer === 'b') houses.ravenclaw++;
        if (answer === 'c') houses.hufflepuff++;
        if (answer === 'd') houses.slytherin++;
      }
    });
    
    // Find the house with the highest score
    let maxScore = 0;
    let maxHouse = '';
    
    for (const [house, score] of Object.entries(houses)) {
      if (score > maxScore) {
        maxScore = score;
        maxHouse = house;
      }
    }
    
    return maxHouse;
  }
  
  async getHouseQuizResultDetails(house: string): Promise<any> {
    const results = {
      gryffindor: {
        house: "Gryffindor",
        verse: "You might belong in Gryffindor, where dwell the brave at heart, Their daring, nerve, and chivalry set Gryffindors apart.",
        icon: "fire",
        description: "Like Harry, Hermione, and Ron, you value courage, bravery, and determination. You stand up for what's right and are willing to face challenges head-on. Your Gryffindor spirit will lead you to great adventures!"
      },
      slytherin: {
        house: "Slytherin",
        verse: "Or perhaps in Slytherin, you'll make your real friends, Those cunning folks use any means to achieve their ends.",
        icon: "snake",
        description: "Like Merlin himself, you're resourceful, ambitious, and determined to succeed. Your cunning mind and leadership qualities set you apart. Your Slytherin traits will help you achieve greatness!"
      },
      hufflepuff: {
        house: "Hufflepuff",
        verse: "You might belong in Hufflepuff, where they are just and loyal, Those patient Hufflepuffs are true and unafraid of toil.",
        icon: "seedling",
        description: "Like Cedric Diggory and Newt Scamander, you value hard work, patience, loyalty, and fair play. Your kindness and dedication make you a true Hufflepuff. Your fairness and friendship will make the world a better place!"
      },
      ravenclaw: {
        house: "Ravenclaw",
        verse: "Or yet in wise old Ravenclaw, if you've a ready mind, Where those of wit and learning will always find their kind.",
        icon: "book-open",
        description: "Like Luna Lovegood and Rowena Ravenclaw herself, you value wisdom, creativity, and intelligence. Your sharp mind and love of learning make you a true Ravenclaw. Your quest for knowledge will take you to new heights!"
      }
    };
    
    return results[house as keyof typeof results];
  }
  
  // Resources methods
  async getExternalResources(): Promise<any> {
    return {
      links: [
        {
          name: "Wizarding World",
          url: "https://www.wizardingworld.com/",
          description: "The official Harry Potter website",
          icon: "globe",
          color: "hufflepuff"
        },
        {
          name: "Warner Bros. Studio Tour",
          url: "https://www.wbstudiotour.co.uk/",
          description: "Visit the making of Harry Potter",
          icon: "ticket",
          color: "gryffindor"
        },
        {
          name: "The Wizarding World at Universal",
          url: "https://www.universalorlando.com/web/en/us/theme-parks/universal-islands-of-adventure/the-wizarding-world-of-harry-potter-hogsmeade",
          description: "Experience the magic at Universal theme parks",
          icon: "hat",
          color: "ravenclaw"
        },
        {
          name: "IMDb - Harry Potter Series",
          url: "https://www.imdb.com/title/tt0241527/",
          description: "Cast, crew, and movie information",
          icon: "film",
          color: "slytherin"
        }
      ],
      fan: [
        {
          name: "r/HarryPotter",
          url: "https://www.reddit.com/r/harrypotter/",
          description: "The Reddit community for Harry Potter fans",
          icon: "reddit",
          color: "gryffindor"
        },
        {
          name: "MuggleNet",
          url: "https://www.mugglenet.com/",
          description: "The #1 Harry Potter fan site",
          icon: "news",
          color: "ravenclaw"
        },
        {
          name: "Pottermore",
          url: "https://www.pottermore.com/",
          description: "Discover your Patronus and wand",
          icon: "book",
          color: "hufflepuff"
        }
      ]
    };
  }
  
  // Initialize with sample data
  private seedData() {
    // Characters
    const charactersData: InsertCharacter[] = [
      {
        name: "Harry Potter",
        title: "The Boy Who Lived",
        house: "Gryffindor",
        wand: "11\", Holly, Phoenix Feather",
        patronus: "Stag",
        description: "The orphaned boy who survived Lord Voldemort's killing curse, Harry is known for his courage, determination, and fierce loyalty to his friends.",
        quote: "I don't go looking for trouble. Trouble usually finds me.",
        imageUrl: "https://images.unsplash.com/photo-1527684651001-731c474bbb5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
      },
      {
        name: "Hermione Granger",
        title: "The Brightest Witch of Her Age",
        house: "Gryffindor",
        wand: "10¾\", Vine Wood, Dragon Heartstring",
        patronus: "Otter",
        description: "Exceptionally intelligent and resourceful, Hermione is the top student in her class and values knowledge and compassion.",
        quote: "Fear of a name only increases fear of the thing itself.",
        imageUrl: "https://images.unsplash.com/photo-1607503873903-c5e95f80d7b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
      },
      {
        name: "Ron Weasley",
        title: "Loyal Friend",
        house: "Gryffindor",
        wand: "14\", Willow, Unicorn Hair",
        patronus: "Jack Russell Terrier",
        description: "Harry's loyal best friend, Ron provides comic relief and emotional grounding. His strategic mind makes him an exceptional wizard chess player.",
        quote: "Bloody hell!",
        imageUrl: "https://pixabay.com/get/ge4e2f441f8fcf14f5ac6e39d5a2c3f56a4180a15ea4220d882e92e78080f4962edfece195a74d0c3d1de34ac1e785c3ff88c77286f42d2e133b9f7c68326b1ac_1280.jpg"
      },
      {
        name: "Draco Malfoy",
        title: "The Slytherin Prince",
        house: "Slytherin",
        wand: "10\", Hawthorn, Unicorn Hair",
        patronus: null,
        description: "Born to a wealthy pure-blood family, Draco struggles between his family's dark allegiances and his own conscience as the series progresses.",
        quote: "My father will hear about this!",
        imageUrl: "https://pixabay.com/get/g528018cffc099bb5f7a86bb5efba511700799d3d459e62ea2585be5602846d2d895f8247dabf5955811405921b81001509cbb2cd33190bbd312952b9e693846f_1280.png"
      },
      {
        name: "Luna Lovegood",
        title: "The Quirky Observer",
        house: "Ravenclaw",
        wand: "Unknown length and wood",
        patronus: "Hare",
        description: "Known for her dreamy and eccentric personality, Luna sees the world differently than others, often perceiving truths that others miss.",
        quote: "You're just as sane as I am.",
        imageUrl: "https://pixabay.com/get/gd5e555e326048c273ba638e67ff01773d1be97eacfe04df92ff2196f129db45ef6ef6562efa5a0061594810f19c7b2ac1e506566a539e915d624c50a97590447_1280.jpg"
      },
      {
        name: "Cedric Diggory",
        title: "The True Champion",
        house: "Hufflepuff",
        wand: "12¼\", Ash, Unicorn Hair",
        patronus: null,
        description: "Handsome, athletic, and honorable, Cedric exemplifies Hufflepuff values of fair play, dedication, and loyalty throughout the Triwizard Tournament.",
        quote: "Take the cup together.",
        imageUrl: "https://pixabay.com/get/gf8dc8a5e3b227671930d423703a1530687198de414663bad0a9cd6f57b7cc6f5d3abf822174a6cd6810c0b0b12a582c6d0a42396602dd7dc10b2a79f9c0aa1cf_1280.jpg"
      }
    ];
    
    // Houses
    const housesData: InsertHouse[] = [
      {
        name: "Gryffindor",
        traits: "Brave, daring, and chivalrous",
        crestUrl: "https://images.unsplash.com/photo-1569285645462-a3f9c6332d56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        founder: "Godric Gryffindor",
        element: "Fire",
        colors: "Scarlet and Gold",
        animal: "Lion",
        ghost: "Nearly Headless Nick"
      },
      {
        name: "Slytherin",
        traits: "Ambitious, cunning, and resourceful",
        crestUrl: "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        founder: "Salazar Slytherin",
        element: "Water",
        colors: "Green and Silver",
        animal: "Serpent",
        ghost: "The Bloody Baron"
      },
      {
        name: "Ravenclaw",
        traits: "Wise, creative, and quick-witted",
        crestUrl: "https://images.unsplash.com/photo-1568743966689-d37c04538535?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        founder: "Rowena Ravenclaw",
        element: "Air",
        colors: "Blue and Bronze",
        animal: "Eagle",
        ghost: "The Grey Lady"
      },
      {
        name: "Hufflepuff",
        traits: "Loyal, patient, and hard-working",
        crestUrl: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        founder: "Helga Hufflepuff",
        element: "Earth",
        colors: "Yellow and Black",
        animal: "Badger",
        ghost: "The Fat Friar"
      }
    ];
    
    // Spells
    const spellsData: InsertSpell[] = [
      {
        name: "Expelliarmus",
        effect: "Disarming Charm",
        type: "Charm",
        light: "Red",
        difficulty: 2
      },
      {
        name: "Wingardium Leviosa",
        effect: "Levitation Charm",
        type: "Charm",
        light: "None",
        difficulty: 1
      },
      {
        name: "Expecto Patronum",
        effect: "Patronus Charm",
        type: "Charm",
        light: "White-blue",
        difficulty: 5
      },
      {
        name: "Alohomora",
        effect: "Unlocking Charm",
        type: "Charm",
        light: "None",
        difficulty: 1
      },
      {
        name: "Lumos",
        effect: "Wand-Lighting Charm",
        type: "Charm",
        light: "White",
        difficulty: 1
      },
      {
        name: "Accio",
        effect: "Summoning Charm",
        type: "Charm",
        light: "None",
        difficulty: 3
      },
      {
        name: "Stupefy",
        effect: "Stunning Spell",
        type: "Charm",
        light: "Red",
        difficulty: 3
      },
      {
        name: "Obliviate",
        effect: "Memory Charm",
        type: "Charm",
        light: "None",
        difficulty: 4
      },
      {
        name: "Riddikulus",
        effect: "Boggart-Banishing Spell",
        type: "Charm",
        light: "None",
        difficulty: 3
      },
      {
        name: "Imperio",
        effect: "Imperius Curse",
        type: "Curse",
        light: "None",
        difficulty: 5
      }
    ];
    
    // Insert characters
    charactersData.forEach((character, index) => {
      const id = this.nextId.characters++;
      // Ensure proper typing for patronus (string | null)
      const patronus = character.patronus === undefined ? null : character.patronus;
      this.characters.set(id, { ...character, id, patronus });
    });
    
    // Insert houses
    housesData.forEach((house, index) => {
      const id = this.nextId.houses++;
      this.houses.set(id, { ...house, id });
    });
    
    // Insert spells
    spellsData.forEach((spell, index) => {
      const id = this.nextId.spells++;
      // Ensure proper typing for light and difficulty (string | null and number | null)
      const light = spell.light === undefined ? null : spell.light;
      const difficulty = spell.difficulty === undefined ? null : spell.difficulty;
      this.spells.set(id, { ...spell, id, light, difficulty });
    });
  }
}

export const storage = new MemStorage();
