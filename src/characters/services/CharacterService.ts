import axios from "axios";
import type { Character } from "../../models";


export class CharacterService {
  private BASE_URL = "http://localhost:4000/characters"

  async getCharacters(): Promise<Character[]> {
    const response = await axios.get<Character[]>(this.BASE_URL);
    return response.data
  }

  async deleteCharacter(id: number): Promise<void> {
    await axios.delete(`${this.BASE_URL}/${id}`)
  }
}