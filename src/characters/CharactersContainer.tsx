import { useState } from "react";
import { useAxios } from "../shared/hooks/useAxios"
import { CharacterList } from "./components/CharacterList";
import type { Character } from "../models";

export const CharactersContainer = () => {
  const [trigger, setTrigger] = useState<boolean>(false);

  const { isLoading, data: characters, error } = useAxios<void, Character[]>({
    url: "http://localhost:4000/characters",
    method: "GET",
    trigger
  })

  const triggerChange = () => {
    setTrigger((prev) => !prev)
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
    </>
  )
}