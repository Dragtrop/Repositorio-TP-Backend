import { Router } from 'express';
import { registrarAlquiler, consultarAlquileres } from './alquiler.controler.js';

export const AlquilerRouter = Router();

AlquilerRouter.post('/alquileres', registrarAlquiler)
AlquilerRouter.get('/alquileres/:usuarioId', consultarAlquileres);
