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
  idservicios:req.body.idservicios,
  imagen: req.body.imagen,
  idDueno: req.body.idDueno
}  

Object.keys(req.body.sanitizedInput).forEach(key=>{
    if(req.body.sanitizedInput[key]=== undefined){
        delete req.body.sanitizedInput[key]
    }
})   
next()
}
    
async function findAll(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  const result = await repository.findAllPaginated(limit, offset);
  res.json(result);
}


async function findOne(req: Request, res: Response) {
    const id = req.params.id;
    if (!id || isNaN(Number(id))) {
        return res.status(400).send({ message: 'ID de garage inválido' });
    }

    const garage = await repository.findOne({ id });
    if (!garage) {
        return res.status(404).send({ message: 'Garage not found' });
    }
    res.json({ data: garage });
}

  


async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
  
    const garageInput = new Garage(
      input.nroGarage,
      input.direccion,
      input.cantLugares,
      input.valorCocheraxH,
      input.idservicios,
      undefined,
      input.idDueno
     );
  
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

async function findByOwner(req: Request, res: Response) {
    const idDueno = Number(req.params.idDueno);

    if (!idDueno) {
        return res.status(400).send({ message: "idDueno es requerido" });
    }

    const garages = await repository.findByOwner(idDueno);
    return res.json({ data: garages });
}

async function removeByNro(req: Request, res: Response) {
  const nroGarage = Number(req.params.nroGarage);

  const garage = await repository.deleteByNro(nroGarage);

  if (!garage) {
    return res.status(404).send({ message: 'Garage not found' });
  }

  return res.status(200).send({ message: 'Garage deleted successfully' });
}

async function findAllTodos(req: Request, res: Response) {
    try {
        const garages = await repository.findAllWithoutPagination();
        res.json(garages);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener todos los garages' });
    }
}



  
export{sanitizeGarageInput,findAll,findOne,add,update,remove, findByOwner, removeByNro, findAllTodos}
