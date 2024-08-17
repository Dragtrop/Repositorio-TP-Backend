import { Router } from "express";
import { sanitizeGarageInput,findAll,findOne,add,update,remove } from "./garage.controler.js";




export const GarageRouter = Router()

GarageRouter.get('/',findAll)

GarageRouter.get('/:id',findOne)

GarageRouter.post('/',sanitizeGarageInput,add)

GarageRouter.put('/:id',sanitizeGarageInput,update)

GarageRouter.patch('/:id',sanitizeGarageInput,update)

GarageRouter.delete('/:id',remove)


