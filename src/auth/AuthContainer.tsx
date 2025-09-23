import { Navigate, Route, Routes } from "react-router-dom";
import { LoginForm, RegisterForm } from "./components";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export const AuthContainer = () => {
  const { state } = useContext(AuthContext)

  if (state.isAuthenticated) {
    return <Navigate to="/characters" />
  }

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  )
}