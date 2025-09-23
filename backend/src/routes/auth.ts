import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, validatePassword } from '../models/User';

const authRouter = Router();

const JWT_SECRET = 'your_jwt_secret_key'; // En producción, usa una variable de entorno

authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };


  if (findUserByEmail(email)) {
    res.status(400).json({ message: 'El usuario ya existe' });
    return;
  }


  const user = await createUser(email, password);
  res.status(201).json({ id: user.id, email: user.email });

});


authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };
  const user = findUserByEmail(email);

  if (!user || !(await validatePassword(user, password))) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {

    expiresIn: '1h',
  });

  res.json({ token });
});

export default authRouter;

