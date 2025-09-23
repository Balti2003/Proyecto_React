import { CharacterItem } from "./CharacterItem";
import { CharacterService } from "../services";
import type { Character } from "../../models";

interface Props {
  characters: Character[],
  onDelete: () => void
}

export const CharacterList = ({ characters, onDelete }: Props) => {

  const characterService = new CharacterService()

  const handleDelete = async (id: number) => {
    try {
      await characterService.deleteCharacter(id)
      onDelete()
    } catch (err) {
      console.log("Error al eliminar un personaje", err);
    }
  }

  return (
    <ul>{
      characters.map((character) => (
        <CharacterItem key={character.id} character={character} >
          <button onClick={() => handleDelete(character.id)}>Eliminar</button>
        </CharacterItem>
      ))
    }</ul>
  )
}