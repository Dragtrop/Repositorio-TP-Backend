import { Request, Response, NextFunction } from "express";
import { VehicleTypesRepository } from "./vehicleTypes.repository.js";
import { VehicleType } from "./vehicleType.entity.js";

const repository = new VehicleTypesRepository();

function sanitizeVehicleTypeInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
    };

    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });

    next();
}

async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
    const id = req.params.id;
    const vehicleType = await repository.findOne({ id });
    if (!vehicleType) {
        return res.status(404).send({ message: 'Vehicle type not found' });
    }
    res.json({ data: vehicleType });
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;

    const vehicleTypeInput = new VehicleType(
        input.nombre,
        input.codigo
    );

    const vehicleType = await repository.add(vehicleTypeInput);
    return res.status(201).send({ message: 'Vehicle type created', data: vehicleType });
}

async function update(req: Request, res: Response) {
    const vehicleType = await repository.update(req.params.id,req.body.sanitizedInput)
  
    if (!vehicleType) {
      return res.status(404).send({ message: 'Vehicle not found' })
    }
  
  return res.status(200).send({ message: 'Vehicle updated successfully', data: vehicleType })
}

async function remove(req: Request, res: Response) {
    const id = req.params.id;
    const vehicleType = await repository.delete({ id });

    if (!vehicleType) {
        res.status(404).send({ message: 'Vehicle type not found' });
    } else {
        res.status(200).send({ message: 'Vehicle type deleted successfully' });
    }
}

export { sanitizeVehicleTypeInput, findAll, findOne, add, update, remove };
