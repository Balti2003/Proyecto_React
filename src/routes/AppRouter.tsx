import { useContext, type ReactNode } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { CharactersContainer } from "../characters/CharactersContainer"
import { AuthContext } from "../auth/context/AuthContext"
import { AuthContainer } from "../auth/AuthContainer"
import { CharacterForm } from "../characters/components/CharacterForm"
import { CharacterProvider } from "../characters/context/CharacterContext"

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { state } = useContext(AuthContext)

  return state.isAuthenticated ? children : <Navigate to="/" />;
}

export const AppRouter = () => (
  <Routes>
    <Route path="/*" element={<AuthContainer />} />
    <Route path="/characters" element={<PrivateRoute><CharacterProvider><CharactersContainer /></CharacterProvider></PrivateRoute>} />
    <Route path="/character/:id" element={<PrivateRoute><CharacterProvider><CharacterForm /></CharacterProvider></PrivateRoute>} />
  </Routes>
)