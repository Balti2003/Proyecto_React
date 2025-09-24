import { createContext, useReducer } from "react";
import React from "react";
import { CharacterActionType, type CharacterAction, type CharacterState } from "../models/CharacterState";

const initialState: CharacterState = {
  characters: new Map()
}

// eslint-disable-next-line react-refresh/only-export-components
export const CharacterContext = createContext<{
  state: CharacterState;
  dispatch: React.Dispatch<CharacterAction>
}>({
  state: initialState,
  dispatch: () => null
})

const characterReducer = (state: CharacterState, action: CharacterAction): CharacterState => {
  switch (action.type) {
    case CharacterActionType.NEW:
      for (const character of action.payload) {
        state.characters.set(character.id, character)
      }

      return { ...state }

    case CharacterActionType.CREATE:
      if (state.characters.has(action.payload.id)) {
        console.error("Ya existe ese personaje en la base de datos")
        return state
      }

      state.characters.set(action.payload.id, action.payload)

      return { ...state }

    case CharacterActionType.EDIT:
      if (!state.characters.has(action.payload.id)) {
        console.error("No se encuentra el personaje a editar")
        return state
      }

      state.characters.set(action.payload.id, action.payload)

      return { ...state }

    case CharacterActionType.DELETE:
      if (!state.characters.has(action.payload)) {
        console.error("No se encuentra el personaje a eliminar")
        return state
      }

      state.characters.delete(action.payload)

      return { ...state }

    default:
      return state
  }
}

interface Props {
  children: React.ReactNode
}
export const CharacterProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(characterReducer, initialState)

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>{children}</CharacterContext.Provider>
  )
}