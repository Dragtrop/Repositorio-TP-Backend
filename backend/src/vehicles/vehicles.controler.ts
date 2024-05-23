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
function findAll(req:Request, res:Response) {
    res.json({ data: repository.findAll() })
}


function findOne(req:Request, res:Response) {
    const id = req.params.id
    const vehicle = repository.findOne({id})
    if (!vehicle) {
      return res.status(404).send({ message: 'Vehicle not found' })
    }
    res.json({ data: vehicle })
}


function add(req:Request,res:Response) {
    const input = req.body.sanitizedInput

    const vehicleInput = new Vehicle(
        input.marca,
        input.patente,        
    )


    const vehicle = repository.add(vehicleInput)
    return res.status(201).send({ message: 'Character created', data: vehicle })

}


function update(req:Request,res:Response) {

    req.body.sanitizedInput.id = req.params.id
    const vehicle = repository.update(req.body.sanitizedInput)
    
    if(!vehicle){
        return res.status(404).send({ message: 'Character not found' })

    }

    return res.status(200).send({message:'Character updated succesfuly',data:vehicle})
    
}



function remove(req:Request,res:Response)  {

    const id = req.params.id
    const vehicle = repository.delete({ id })

    if (!vehicle){
        res.status(404).send({message:'Character not found'})
    }else{
        res.status(200).send({message:'character deleted successfully'})
    }
}

export{sanitizeVehicleInput,findAll,findOne,add,update,remove}