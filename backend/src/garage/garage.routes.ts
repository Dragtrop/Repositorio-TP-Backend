import { Router } from "express";
import {
  sanitizeGarageInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  findByOwner,
  removeByNro,
  findAllTodos,
  getHistorial,
  alquilarGarage
} from "./garage.controler.js";

import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware.js";

export const GarageRouter = Router();

GarageRouter.get('/todos', findAllTodos);

GarageRouter.get(
  '/mis-garages',
  authMiddleware,
  roleMiddleware(['Dueño']),
  findByOwner
);

GarageRouter.get('/historial/:nroGarage', getHistorial);

GarageRouter.get('/', findAll);

GarageRouter.put(
  '/:id/alquilar',
  authMiddleware,
  alquilarGarage
);

GarageRouter.get('/:id', findOne);

GarageRouter.post(
  '/',
  authMiddleware,
  roleMiddleware(['Dueño']),
  sanitizeGarageInput,
  add
);

GarageRouter.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['Dueño']),
  sanitizeGarageInput,
  update
);

GarageRouter.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(['Dueño']),
  sanitizeGarageInput,
  update
);

GarageRouter.delete(
  '/nro/:nroGarage',
  authMiddleware,
  roleMiddleware(['Dueño']),
  removeByNro
);

GarageRouter.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['Dueño']),
  remove
);