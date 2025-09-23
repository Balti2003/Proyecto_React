import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { FormInput } from "../../shared/components";
import { AuthContext } from "../context";
import { AuthActionType } from "../models/AuthState";

const loginSchema = z.object({
  email: z.string().email("Email es inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres")
})

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormData>(
    { resolver: zodResolver(loginSchema) }
  )

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const authService = new AuthService();
      const user = await authService.login(data.email, data.password)
      dispatch({ type: AuthActionType.LOGIN, payload: user })
      navigate("/characters")
    } catch (error) {
      console.error(error)
      if (error instanceof Error)
        alert(error.message || "Error en la autenticación")
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <FormInput label="Email" register={register("email")} error={formState.errors.email?.message} />
        <FormInput label="Password" register={register("password")} error={formState.errors.password?.message} />
        <button type="submit">Logguearse</button>
      </form>

      <p>No tienes cuenta ? <Link to="/register">Regístrate</Link></p>
    </div>
  )
}