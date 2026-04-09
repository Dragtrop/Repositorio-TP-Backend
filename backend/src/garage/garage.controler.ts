import { GarageRepository } from "./garage.repository.js"
import { Garage } from "./garage.entity.js"
import { Request,Response,NextFunction } from "express"

const repository = new GarageRepository()

function sanitizeGarageInput(req: Request, res: Response, next: NextFunction) {
  const sanitized: any = {
    direccion: req.body.direccion,
    cantLugares: Number(req.body.cantLugares),
    valorCocheraxH: Number(req.body.valorCocheraxH),
    activo: 1
  };

  if (req.body.idservicios !== undefined && req.body.idservicios !== '') {
    const parsed = Number(req.body.idservicios);
    if (!isNaN(parsed)) {
      sanitized.idservicios = parsed;
    }
  }

  if (req.body.imagen !== undefined && req.body.imagen !== null && req.body.imagen !== '') {
    sanitized.imagen = req.body.imagen;
  }

  req.body.sanitizedInput = sanitized;
  next();
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
  try {

    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const input = req.body.sanitizedInput;

    const garageInput = new Garage(
      0,
      input.direccion,
      input.cantLugares,
      input.valorCocheraxH,
      input.idservicios,
      undefined,
      req.user.id,
      input.activo
    );

    const garage = await repository.add(garageInput);

    return res.status(201).json({
      message: "Garage creado correctamente",
      data: garage
    });

  } catch (error: any) {
    console.error("Error creando garage:", error);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}

async function update(req: Request, res: Response) {
  try {

    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const id = req.params.id;

    const existingGarage = await repository.findOne({ id });

    if (!existingGarage) {
      return res.status(404).json({ message: "Garage no encontrado" });
    }

    if (existingGarage.idDueno !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permiso para modificar este garage"
      });
    }

    const updatedGarage = await repository.update(id, {
      ...req.body.sanitizedInput,
      idDueno: req.user.id
    });

    return res.status(200).json({
      message: "Garage actualizado correctamente",
      data: updatedGarage
    });

  } catch (error) {
    console.error("Error actualizando garage:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function remove(req: Request, res: Response) {
  try {

    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const id = req.params.id;

    const existingGarage = await repository.findOne({ id });

    if (!existingGarage) {
      return res.status(404).json({ message: "Garage no encontrado" });
    }

    if (existingGarage.idDueno !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permiso para eliminar este garage"
      });
    }

    await repository.delete({ id });

    return res.status(200).json({
      message: "Garage eliminado correctamente"
    });

  } catch (error) {
    console.error("Error eliminando garage:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function findByOwner(req: Request, res: Response) {
  try {

    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const idDueno = req.user.id;
    const garages = await repository.findByOwner(idDueno);

    return res.status(200).json({
      data: garages
    });

  } catch (error) {
    console.error("Error obteniendo garages del dueño:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
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

async function getHistorial(req: Request, res: Response) {
  const nroGarage = Number(req.params.nroGarage);

  if (!nroGarage) {
    return res.status(400).send({ message: "nroGarage requerido" });
  }

  const historial = await repository.getHistorialPrecios(nroGarage);
  return res.json(historial);
}

async function alquilarGarage(req: Request, res: Response) {
  try {
    const nroGarage = Number(req.params.id);
    const cantidad = Number(req.body.cantidad) || 1;

    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const garage = await repository.findByNroGarage(nroGarage);
    if (!garage) return res.status(404).json({ message: "Garage no encontrado" });

    if (garage.cantLugares < 1)
      return res.status(400).json({ message: "No hay lugares disponibles" });

    const nuevaCantLugares = garage.cantLugares - 1;
    const garageActualizado = await repository.updateCantLugares(nroGarage, nuevaCantLugares);

    return res.status(200).json({
      message: "Alquiler registrado correctamente",
      data: garageActualizado
    });

  } catch (error) {
    console.error("Error alquilando garage:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export { sanitizeGarageInput, findAll, findOne, add, update, remove, findByOwner, removeByNro, findAllTodos, getHistorial, alquilarGarage }