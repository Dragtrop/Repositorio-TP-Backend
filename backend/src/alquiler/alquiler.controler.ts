import { AlquilerRepository } from './alquiler.repository.js';
import { Request, Response } from 'express';

const alquilerRepo = new AlquilerRepository();

export async function registrarAlquiler(req: Request, res: Response) {
  const { garageId, usuarioId, duracionHoras, servicios, vehiculoId, total } = req.body;

  try {

    const garage = await alquilerRepo.getGarageById(garageId);

    if (!garage) {
      return res.status(404).json({ message: 'Garage no encontrado' });
    }

    if (garage.activo === 0) {
      return res.status(400).json({ message: 'El garage no está disponible para alquilar' });
    }

    if (garage.cantLugares <= 0) {
      return res.status(400).json({ message: 'No hay lugares disponibles en este garage' });
    }

    await alquilerRepo.registrarAlquiler(garageId, usuarioId, duracionHoras, servicios, vehiculoId, total);
    res.status(200).json({ message: 'Alquiler registrado exitosamente' });

  } catch (error) {
    console.error('Error al registrar el alquiler:', error);
    res.status(500).json({ error: 'Error al registrar el alquiler' });
  }
}

export async function consultarAlquileres(req: Request, res: Response) {
  const usuarioId = Number(req.params.usuarioId);

  if (isNaN(usuarioId)) {
    return res.status(400).json({ error: 'El usuarioId no es un número válido' });
  }

  try {
    const alquileres = await alquilerRepo.consultarAlquileres(usuarioId);
    res.status(200).json(alquileres);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar los alquileres' });
  }
}

export async function liberarAlquiler(req: Request, res: Response) {
  const alquilerId = Number(req.params.id);

  if (isNaN(alquilerId)) {
    return res.status(400).json({ error: 'ID de alquiler inválido' });
  }

  try {
    await alquilerRepo.liberarAlquiler(alquilerId);
    res.status(200).json({ message: 'Alquiler liberado exitosamente' });
  } catch (error) {
    console.error('Error al liberar alquiler:', error);
    res.status(500).json({ error: 'Error al liberar el alquiler' });
  }
}

