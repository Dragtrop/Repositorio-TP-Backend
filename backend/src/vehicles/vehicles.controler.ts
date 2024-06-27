import { Request,Response,NextFunction } from "express"
import { VehiclesRepository } from "./vehicles.repository.js"
import { Vehicle } from "./vehicles.entity.js"

const repository = new VehiclesRepository()


function sanitizeVehicleInput(req:Request,res:Response, next: NextFunction){
    
    req.body.sanitizedInput = {
      marca: req.body.marca,
      patente: req.body.patente,
    }  
     
     Object.keys(req.body.sanitizedInput).forEach(key=>{
 
         if(req.body.sanitizedInput[key]=== undefined){
            delete req.body.sanitizedInput[key]
         }
    })
 
     
    next()
 
 
}
async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
    const id = req.params.id
    const vehicle = await repository.findOne({ id })
    if (!vehicle) {
      return res.status(404).send({ message: 'Vehicle not found' })
    }
    res.json({ data: vehicle })
}
  


async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
  
    const vehicleInput = new Vehicle(
      input.patente,
      input.modelo,
    )
  
    const vehicle = await repository.add(vehicleInput)
    return res.status(201).send({ message: 'Vehicle created', data: vehicle })
}
  

async function update(req: Request, res: Response) {
    const vehicle = await repository.update(req.params.id,req.body.sanitizedInput)
  
    if (!vehicle) {
      return res.status(404).send({ message: 'Vehicle not found' })
    }
  
  return res.status(200).send({ message: 'Vehicle updated successfully', data: vehicle })
}


async function remove(req: Request, res: Response) {
    const id = req.params.id
    const vehicle = await repository.delete({ id })
  
    if (!vehicle) {
      res.status(404).send({ message: 'Vehicle not found' })
    } else {
      res.status(200).send({ message: 'Vehicle deleted successfully' })
    }
  }
export{sanitizeVehicleInput,findAll,findOne,add,update,remove}