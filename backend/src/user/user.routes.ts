import { Router } from "express";
import { sanitizeUserInput,findAll,findOne,add,update,remove,create,login ,findVehiclesByUser,addVehicleToUser} from "./user.controler.js";





export const UserRouter = Router()



UserRouter.get('/',findAll)

UserRouter.get('/:id',findOne)

UserRouter.post('/',sanitizeUserInput,add)

UserRouter.put('/:id',sanitizeUserInput,update)

UserRouter.patch('/:id',sanitizeUserInput,update)

UserRouter.delete('/:id',remove)

UserRouter.post('/login',login);

UserRouter.post('/register',sanitizeUserInput,create);

UserRouter.post('/logout',);

UserRouter.get("/:usuarioId/vehiculos", findVehiclesByUser);

UserRouter.post("/addVehicleToUser", addVehicleToUser);
