import { useAxios } from "../shared/hooks/useAxios"
import { CharacterList } from "./components/CharacterList";
import type { Character } from "../models";
import { useCallback, useContext } from "react";
import { ModalContext } from "../shared/components/Modal/context/ModalContext";
import { Modal } from "../shared/components/Modal/Modal";
import { characterService } from "./services/CharacterService";

export const CharactersContainer = () => {
  const serviceCall = useCallback(() => characterService.getCharacters(), []);
  const {setState} = useContext(ModalContext);

  const { isLoading, data: characters, error } = useAxios<void, Character[]>({
    serviceCall,
    trigger: true,
  })

  const openModal = () => {
    setState(true);
  }

  if (isLoading) return <p>Cargando Personajes...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      {characters && characters?.length > 0 ?
        <CharacterList characters={characters} onDelete={triggerChange}>
        </CharacterList>
        :
        <div>No hay personajes</div>
      }
      <button onClick={openModal}>Crear Personaje</button>
      <Modal>
        <div></div>
      </Modal>
    </>
  )
}