import { GarageRepository } from "./garage.repository.js"
import { Garage } from "./garage.entity.js"
import { Request,Response,NextFunction } from "express"



const repository = new GarageRepository()


function sanitizeGarageInput(req:Request,res:Response, next: NextFunction){
    
    req.body.sanitizedInput = {
      nroGarage: req.body.nroGarage,
      direccion: req.body.direccion,
      cantLugares: req.body.cantLugares,
      valorCocheraxH: req.body.valorCocheraxH,
    
    }  
     
     Object.keys(req.body.sanitizedInput).forEach(key=>{
 
         if(req.body.sanitizedInput[key]=== undefined){
            delete req.body.sanitizedInput[key]
         }
    })   
    next()}
    
async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
    const id = req.params.id
    const garage = await repository.findOne({ id })
    if (!garage) {
      return res.status(404).send({ message: 'Garage not found' })
    }
    res.json({ data: garage })
}
  


async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
  
    const garageInput = new Garage(
      input.nroGarage,
      input.direccion,
      input.cantLugares,
      input.valorCocheraxH,
    )
  
    const garage = await repository.add(garageInput)
    return res.status(201).send({ message: 'Garage created', data: garage })
}
  

async function update(req: Request, res: Response) {
    const garage = await repository.update(req.params.id,req.body.sanitizedInput)
  
    if (!garage) {
      return res.status(404).send({ message: 'Garage not found' })
    }
  
  return res.status(200).send({ message: 'Garage updated successfully', data: garage })
}


async function remove(req: Request, res: Response) {
    const id = req.params.id
    const garage = await repository.delete({ id })
  
    if (!garage) {
      res.status(404).send({ message: 'Garage not found' })
    } else {
      res.status(200).send({ message: 'Garage deleted successfully' })
    }
  }
export{sanitizeGarageInput,findAll,findOne,add,update,remove}