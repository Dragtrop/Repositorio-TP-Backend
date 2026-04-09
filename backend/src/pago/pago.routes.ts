import { Router } from 'express';
import { PagoController } from './pago.controler.js';

export const PagoRouter = Router();
const pagoController = new PagoController();

PagoRouter.get('/alquileres/:usuarioId', pagoController.getAlquileres.bind(pagoController));
PagoRouter.post('/crear-preferencia', pagoController.crearPreferencia.bind(pagoController));
PagoRouter.post('/webhook', pagoController.webhook.bind(pagoController));
