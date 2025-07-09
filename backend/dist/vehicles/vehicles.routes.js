import { Router } from "express";
import { sanitizeVehicleInput, findAll, findOne, add, update, remove } from "./vehicles.controler.js";
export const characterRouter = Router();
characterRouter.get('/', findAll);
characterRouter.get('/:id', findOne);
characterRouter.post('/', sanitizeVehicleInput, add);
characterRouter.put('/:id', sanitizeVehicleInput, update);
characterRouter.patch('/:id', sanitizeVehicleInput, update);
characterRouter.delete('/:id', remove);
//# sourceMappingURL=vehicles.routes.js.map