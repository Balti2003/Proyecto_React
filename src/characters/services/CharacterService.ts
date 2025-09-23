import axios from "axios";
import type { Character } from "../../models";

class CharacterService {
  private BASE_URL = "http://localhost:4000/characters"

  async getCharacters(): Promise<Character[]> {
    const response = await axios.get<Character[]>(this.BASE_URL);
    return response.data
  }

  async deleteCharacter(id: number): Promise<void> {
    const response = await axios.delete(`${this.BASE_URL}/${id}`)
    return response.data
  }

  async editCharacter(data: Character): Promise<void> {
    const response = await axios.put(`${this.BASE_URL}/${data.id}`, data)
    return response.data
  }

  async addCharacter(data: Omit<Character, "id">): Promise<Character> {
    const response = await axios.post<Character>(this.BASE_URL, data)
    return response.data
  }
}

export const characterService = new CharacterService();