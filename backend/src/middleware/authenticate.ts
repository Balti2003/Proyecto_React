import { Request, Response as ExpressResponse, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key'; // En producción, usa una variable de entorno

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}


export const authenticateToken = (
  req: AuthenticatedRequest,
  res: ExpressResponse,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // No autorizado
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {

      res.sendStatus(403); // Prohibido
      return;
    }
    req.user = user;
    next();
  });

};

