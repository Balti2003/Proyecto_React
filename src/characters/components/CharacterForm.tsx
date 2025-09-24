import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FormInput } from "../../shared/components";
import { ModalContext } from "../../shared/components/Modal/context/ModalContext";
import { Gender, Status } from "../../models";
import { CharacterContext } from "../context/CharacterContext";
import { CharacterActionType } from "../models/CharacterState";
import { characterService } from "../services/CharacterService";

const characterSchema = z.object(
  {
    id: z.number().default(-1),
    name: z.string().min(1, "El nombre es requerido"),
    status: z.nativeEnum(Status, {
      //errorMap: () => ({ message: "Status inválido" })
    }),
    species: z.string().min(1, "La especia es requerida"),
    type: z.string(),
    gender: z.nativeEnum(Gender, {
      //errorMap: () => ({ message: "Género inválido" }),
    }),
    origin: z.object({
      name: z.string().min(1, "El origen es requerido"),
      url: z.string().url("URL de origen inválida"),
    }),
    location: z.object({
      name: z.string().min(1, "La ubicación es requerida"),
      url: z.string().url("URL de ubicación inválida"),
    }),
    image: z.string().url("URL de imagen inválida"),
    episode: z.array(z.string().url("URL de episodio inválida")).default([]),
    url: z.string().url("URL del personaje inválida"),
    created: z.string(),
  });

type CharacterFormData = z.infer<typeof characterSchema>

export const CharacterForm = () => {
  const { register, handleSubmit, formState, reset } = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema)
  })

  const { id } = useParams()
  const { state, dispatch } = useContext(CharacterContext)
  const { setState: modalSetState } = useContext(ModalContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const foundCharacter = state.characters.get(Number(id))
      reset(foundCharacter)
    }
  }, [id, reset, state.characters])

  const onSubmit = async (data: CharacterFormData) => {
    try {
      const actionType = id ? CharacterActionType.EDIT : CharacterActionType.CREATE

      let result = null;

      if (id) {
        result = await characterService.editCharacter(data)
      } else {
        result = await characterService.addCharacter(data)
      }

      dispatch({ type: actionType, payload: result })

      modalSetState(false)
      navigate("/characters")
    }
    catch (error) {
      if (error instanceof Error)
        alert(error.message || "Error en la operación")
    }
  }

  return (
    <div className="container">
      <h2>{id ? "Editar" : "Crear"} Personaje</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Nombre" register={register("name")} error={formState.errors.name?.message} />
        <FormInput
          label="Status"
          register={register("status")}
          error={formState.errors.status?.message}
        />
        <FormInput
          label="Especie"
          register={register("species")}
          error={formState.errors.species?.message}
        />
        <FormInput
          label="Tipo"
          register={register("type")}
          error={formState.errors.type?.message}
        />
        <FormInput
          label="Género"
          register={register("gender")}
          error={formState.errors.gender?.message}
        />
        <FormInput
          label="Origen Nombre"
          register={register("origin.name")}
          error={formState.errors.origin?.name?.message}
        />
        <FormInput
          label="Origen URL"
          register={register("origin.url")}
          error={formState.errors.origin?.url?.message}
        />
        <FormInput
          label="Ubicación Nombre"
          register={register("location.name")}
          error={formState.errors.location?.name?.message}
        />
        <FormInput
          label="Ubicación URL"
          register={register("location.url")}
          error={formState.errors.location?.url?.message}
        />
        <FormInput
          label="Imagen URL"
          register={register("image")}
          error={formState.errors.image?.message}
        />
        <FormInput
          label="URL del Personaje"
          register={register("url")}
          error={formState.errors.url?.message}
        />
        <FormInput
          label="Fecha de Creación"
          register={register("created")}
          error={formState.errors.created?.message}
        />
        <button type="submit">{id ? "Editar" : "Crear"}</button>
      </form>
    </div>
  )
}