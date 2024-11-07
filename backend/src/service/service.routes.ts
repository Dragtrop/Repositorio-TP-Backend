import { Router } from "express";
import { sanitizeServiceInput,findAll,findOne,add,update,remove } from "./service.controler.js";

export const serviceRouter = Router()

serviceRouter.get('/',findAll)

serviceRouter.get('/:id',findOne)

serviceRouter.post('/',sanitizeServiceInput,add)

serviceRouter.put('/:id',sanitizeServiceInput,update)

serviceRouter.patch('/:id',sanitizeServiceInput,update)

serviceRouter.delete('/:id',remove)


