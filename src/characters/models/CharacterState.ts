import type { Character } from "./character.model";

export enum CharacterActionType {
  NEW = "NEW",
  CREATE = "CREATE",
  DELETE = "DELETE",
  EDIT = "EDIT"
}

export interface CharacterState {
  characters: Map<number, Character>;
}

export type CharacterAction =
  | { type: CharacterActionType.NEW, payload: Character[] }
  | { type: CharacterActionType.CREATE, payload: Character }
  | { type: CharacterActionType.EDIT, payload: Character }
  | { type: CharacterActionType.DELETE, payload: number }