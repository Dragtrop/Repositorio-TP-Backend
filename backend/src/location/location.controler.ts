import { LocationsRepository } from "./location.repository.js"
import { Location } from "./location.entity.js"
import { Request,Response,NextFunction } from "express"

const repository = new LocationsRepository()


function sanitizeLocationInput(req:Request,res:Response, next: NextFunction){
    
    req.body.sanitizedInput = {
      codigoPostal: req.body.codigoPostal,
      nombre: req.body.nombre,


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
    const location = await repository.findOne({ id })
    if (!location) {
      return res.status(404).send({ message: 'Location not found' })
    }
    res.json({ data: location })
}
  


async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
  
    const locationInput = new Location(
      input.codigoPostal,
      input.nombre
    )
  
    const location = await repository.add(locationInput)
    return res.status(201).send({ message: 'Location created', data: location })
}
  

async function update(req: Request, res: Response) {
    const location = await repository.update(req.params.id,req.body.sanitizedInput)
  
    if (!location) {
      return res.status(404).send({ message: 'Location not found' })
    }
  
  return res.status(200).send({ message: 'Location updated successfully', data: location })
}


async function remove(req: Request, res: Response) {
    const id = req.params.id
    const location = await repository.delete({ id })
  
    if (!location) {
      res.status(404).send({ message: 'Location not found' })
    } else {
      res.status(200).send({ message: 'Location deleted successfully' })
    }
  }
export{sanitizeLocationInput,findAll,findOne,add,update,remove}