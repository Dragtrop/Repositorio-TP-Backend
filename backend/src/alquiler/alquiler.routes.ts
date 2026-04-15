import { Router } from 'express';
import { registrarAlquiler, consultarAlquileres, liberarAlquiler } from './alquiler.controler.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

export const AlquilerRouter = Router();

AlquilerRouter.post(
  '/',
  authMiddleware,
  roleMiddleware(["Cliente", "Dueño", "Admin"]),
  registrarAlquiler
);

AlquilerRouter.get(
  '/:usuarioId',
  authMiddleware,
  roleMiddleware(["Cliente", "Dueño", "Admin"]),
  consultarAlquileres
);

AlquilerRouter.put(
  '/:id/liberar',
  authMiddleware,
  roleMiddleware(["Cliente"]),
  liberarAlquiler
);
