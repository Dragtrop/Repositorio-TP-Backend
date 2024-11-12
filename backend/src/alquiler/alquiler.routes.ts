import { Router } from 'express';
import { registrarAlquiler } from './alquiler.controler.js';

export const AlquilerRouter = Router();

AlquilerRouter.post('/', registrarAlquiler);
//AlquilerRouter.get('/alquileres/:usuarioId', consultarAlquileres);
