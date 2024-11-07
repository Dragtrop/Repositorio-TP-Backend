import { Router } from 'express';
import { registrarAlquiler } from './alquiler.controler';

export const AlquilerRouter = Router();

AlquilerRouter.post('/', registrarAlquiler);