import { Router } from 'express';
import { PagoController } from './pago.controler.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

export const PagoRouter = Router();
const pagoController = new PagoController();

PagoRouter.get(
  '/alquileres/:usuarioId',
  authMiddleware,
  roleMiddleware(["Cliente", "Dueño", "Admin"]),
  pagoController.getAlquileres.bind(pagoController)
);

PagoRouter.post(
  '/crear-preferencia',
  authMiddleware,
  roleMiddleware(["Cliente", "Admin"]),
  pagoController.crearPreferencia.bind(pagoController)
);

PagoRouter.post('/webhook', pagoController.webhook.bind(pagoController));