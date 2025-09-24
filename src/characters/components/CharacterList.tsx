import { CharacterItem } from "./CharacterItem";
import type { Character } from "../../models";
import { characterService } from "../services";
import { CharacterContext } from "../context/CharacterContext";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../shared/hooks/useAxios";
import { CharacterActionType } from "../models/CharacterState";

interface Props {
  characters: Character[],
  //onDelete: () => void
}

export const CharacterList = ({ characters }: Props) => {

  const { dispatch } = useContext(CharacterContext)
  const navigate = useNavigate();

  const deleteCharacterServiceCall = useCallback((id: number) => characterService.deleteCharacter(id), [])
 
  const { error: deleteError, executeFetch: executeDeleteCharacterFetch } = useAxios<number, void>({
    serviceCall: deleteCharacterServiceCall
  })

  const handleDelete = async (id: number) => {
    executeDeleteCharacterFetch(id)
    if(!deleteError) {
      dispatch({
        type: CharacterActionType.DELETE,
        payload: id
      })
    }
  }

  const handleEdit = (id: number) => {
    navigate(`/character/${id}`)
  }

  return (
    <ul>{
      characters.map((character) => (
        <CharacterItem key={character.id} character={character} >
          <button onClick={() => handleDelete(character.id)}>Eliminar</button>
          <button onClick={() => handleEdit(character.id)}>Editar</button>
        </CharacterItem>
      ))
    }</ul>
  )
}