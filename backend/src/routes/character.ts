import { Router, Response as ExpressResponse } from 'express';
import {
  getAllCharacters,
  getCharacterById,
  addCharacter,
  updateCharacter,

  deleteCharacter,
  Character,
} from '../models/Character';

import { authenticateToken, AuthenticatedRequest } from '../middleware/authenticate';


const characterRouter = Router();


// Aplica el middleware de autenticación a todas las rutas
characterRouter.use(authenticateToken);


// Obtener todos los personajes
characterRouter.get('/', (_req: AuthenticatedRequest, res: ExpressResponse): void => {
  const characters = getAllCharacters();
  res.json(characters);
});

// Obtener un personaje por ID
characterRouter.get('/:id', (req: AuthenticatedRequest, res: ExpressResponse): void => {
  const id = parseInt(req.params.id, 10);
  const character = getCharacterById(id);
  if (character) {
    res.json(character);
  } else {
    res.status(404).json({ message: 'Personaje no encontrado' });
  }
});


// Agregar un nuevo personaje
characterRouter.post('/', (req: AuthenticatedRequest, res: ExpressResponse): void => {
  const characterData: Character = req.body;

  if (!characterData.name || !characterData.species) {
    res.status(400).json({ message: 'Nombre y especie son requeridos' });
    return;

  }

  const newCharacter: Character = {
    ...characterData,
    id: Date.now(), // Generar un ID único
  };

  addCharacter(newCharacter);
  res.status(201).json(newCharacter);
});

// Actualizar un personaje existente
characterRouter.put('/:id', (req: AuthenticatedRequest, res: ExpressResponse): void => {
  const id = parseInt(req.params.id, 10);
  const characterData: Character = req.body;

  const updatedCharacter = updateCharacter(id, characterData);
  if (updatedCharacter) {
    res.json(updatedCharacter);
  } else {

    res.status(404).json({ message: 'Personaje no encontrado' });
  }
});

// Eliminar un personaje
characterRouter.delete('/:id', (req: AuthenticatedRequest, res: ExpressResponse): void => {
  const id = parseInt(req.params.id, 10);
  const success = deleteCharacter(id);
  if (success) {
    res.json({ message: 'Personaje eliminado' });
  } else {
    res.status(404).json({ message: 'Personaje no encontrado' });
  }
});

export default characterRouter;

