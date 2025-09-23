import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthService } from "../services/AuthService";
import { FormInput } from "../../shared/components";

const registerSchema = z.object({
  email: z.string().email("Émail es inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Mínimo 6 caracteres")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const authService = new AuthService();
      await authService.register(data.email, data.password)
      alert("Registro Exitoso, ahora puede iniciar sesión")
      navigate("/")
    } catch (error) {
      console.error(error)
      if (error instanceof Error)
        alert(error.message || "Error en el registro")
    }
  }

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <FormInput label='Email' register={register("email")} error={formState.errors.email?.message} />
        <FormInput label='Password' register={register("password")} error={formState.errors.password?.message} />
        <FormInput label='Confirm Password' register={register("confirmPassword")} error={formState.errors.confirmPassword?.message} />
        <button type="submit">Registrarse</button>
      </form>
      <p>Ya tenés cuenta ? <Link to="/">Iniciar Sesión</Link></p>
    </div>
  )
}