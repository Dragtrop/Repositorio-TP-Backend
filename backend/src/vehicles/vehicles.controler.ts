import { VehiclesRepository } from "./vehicles.repository.js"
import { Vehicle } from "./vehicles.entity.js"
import { Request,Response,NextFunction } from "express"
import { pool } from '../shared/db/conn.mysql.js';
import { UserRepository } from "../user/user.repository.js";


const repository = new VehiclesRepository()
const usersRepository = new UserRepository();

function sanitizeVehicleInput(req:Request,res:Response, next: NextFunction){
    
    req.body.sanitizedInput = {
      patente: req.body.patente,
      marca: req.body.marca,
      codtipv:req.body.codtipv,

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
      input.marca,
      input.codtipv,
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

async function addVehicleToUser(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const { patente, marca, codtipv } = req.body;
  try {
    const vehicle = await repository.add({ patente, marca, codtipv });

    if (!vehicle || !vehicle.id) {
      return res.status(500).json({ message: 'Error creating vehicle' });
    }

    const vehicleId = vehicle.id;
    
    if (typeof vehicleId !== 'number') {
      return res.status(500).json({ message: 'Invalid vehicle ID' });
    }

    await usersRepository.addVehicleToUser(userId, vehicleId);

    res.status(201).json({
      message: "Vehicle added successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle to user', error: error});
  }
}

async function obtenerVehiculosConGarage(req: Request, res: Response) {
  const usuarioId = parseInt(req.params.usuarioId);

  try {
      const vehiculos = await repository.obtenerVehiculosConGarage(usuarioId);
      res.status(200).json(vehiculos);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos y garage' });
  }
}





export{sanitizeVehicleInput,findAll,findOne,add,update,remove,addVehicleToUser,obtenerVehiculosConGarage,}