import { Router } from "express";
import { sanitizeUserInput,findAll,findOne,add,update,remove,create,login ,findVehiclesByUser,addVehicleToUser, activateUser} from "./user.controler.js";

export const UserRouter = Router()

UserRouter.post('/login', login)
UserRouter.post('/register', sanitizeUserInput, create)

UserRouter.get("/:usuarioId/vehiculos", findVehiclesByUser)
UserRouter.post("/addVehicleToUser", addVehicleToUser)

UserRouter.get('/', findAll)
UserRouter.get('/:id', findOne)
UserRouter.post('/', sanitizeUserInput, add)
UserRouter.put('/:id', sanitizeUserInput, update)
UserRouter.patch('/:id', sanitizeUserInput, update)
UserRouter.delete('/:id', remove)

UserRouter.put('/admin/:id/activar', activateUser);
UserRouter.put('/admin/:id/desactivar', sanitizeUserInput, remove);
