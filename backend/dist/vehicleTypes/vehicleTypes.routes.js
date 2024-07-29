import { Router } from "express";
import { sanitizeVehicleTypeInput, findAll, findOne, add, update, remove } from "./vehicleTypes.controler.js";
export const characterRouterVehicleTypes = Router();
characterRouterVehicleTypes.get('/', findAll);
characterRouterVehicleTypes.get('/:id', findOne);
characterRouterVehicleTypes.post('/', sanitizeVehicleTypeInput, add);
characterRouterVehicleTypes.put('/:id', sanitizeVehicleTypeInput, update);
characterRouterVehicleTypes.patch('/:id', sanitizeVehicleTypeInput, update);
characterRouterVehicleTypes.delete('/:id', remove);
//# sourceMappingURL=vehicleTypes.routes.js.map