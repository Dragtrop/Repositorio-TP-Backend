import { Router } from 'express';
import { registrarAlquiler, consultarAlquileres, liberarAlquiler } from './alquiler.controler.js';

export const AlquilerRouter = Router();

AlquilerRouter.post('/', registrarAlquiler);

AlquilerRouter.get('/:usuarioId', consultarAlquileres);

AlquilerRouter.put('/:id/liberar', liberarAlquiler);
