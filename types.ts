export interface MetaphorData {
  originalSentence: string;
  tenor: string; // The Concept (e.g., University Degree)
  vehicle: string; // The Image (e.g., Passport)
  characteristics: Characteristic[];
  challenges: string[];
  alternatives: string[];
}

export interface Characteristic {
  id: string;
  literal: string; // Feature of the vehicle (e.g., "Allows entry to a country")
  mapped: string; // Equivalent in the tenor (e.g., "Allows entry to job market")
}

export enum AppMode {
  HOME = 'HOME',
  EXAMPLE = 'EXAMPLE',
  WIZARD = 'WIZARD',
}

export enum Step {
  IDENTIFY = 1,
  CHARACTERISTICS = 2,
  MAPPING = 3,
  CHALLENGE = 4,
  ALTERNATIVES = 5,
  SUMMARY = 6,
}