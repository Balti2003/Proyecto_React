export enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown'
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
  Unknown = 'unknown'
}

export type Origin = {
  name: string;
  url: string;
}

export type Location = {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
// src/models/Character.ts (continuación)

const characters: Character[] = [];

// Inicializar con algunos personajes si lo deseas
// characters = [...];

export const getAllCharacters = (): Character[] => {
  return characters;
};

export const getCharacterById = (id: number): Character | undefined => {
  return characters.find((character) => character.id === id);
};

export const addCharacter = (character: Character): Character => {

  characters.push(character);
  return character;

};

export const updateCharacter = (id: number, updatedCharacter: Character): Character | null => {
  const index = characters.findIndex((char) => char.id === id);
  if (index !== -1) {
    characters[index] = { ...updatedCharacter, id };
    return characters[index];
  }
  return null;
};

export const deleteCharacter = (id: number): boolean => {
  const index = characters.findIndex((char) => char.id === id);
  if (index !== -1) {
    characters.splice(index, 1);
    return true;
  }
  return false;
};

