import { Router } from 'express';
import { registrarAlquiler, consultarAlquileres } from './alquiler.controler.js';

export const AlquilerRouter = Router();

AlquilerRouter.post('/', registrarAlquiler);
AlquilerRouter.get('/:usuarioId', consultarAlquileres);
