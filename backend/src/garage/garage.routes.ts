import { Router } from "express";
import { sanitizeGarageInput,findAll,findOne,add,update,remove,findByOwner, removeByNro, findAllTodos } from "./garage.controler.js";


export const GarageRouter = Router()

GarageRouter.get('/todos', findAllTodos)

GarageRouter.get('/',findAll)

GarageRouter.get('/dueno/:idDueno', findByOwner);

GarageRouter.get('/:id', findOne);

GarageRouter.post('/',sanitizeGarageInput,add)

GarageRouter.put('/:id',sanitizeGarageInput,update)

GarageRouter.patch('/:id',sanitizeGarageInput,update)

GarageRouter.delete('/:id',remove)

GarageRouter.delete('/nro/:nroGarage', removeByNro);




