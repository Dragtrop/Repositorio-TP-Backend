import { AlquilerRepository } from './alquiler.repository.js';
import { Request, Response } from 'express';

const alquilerRepo = new AlquilerRepository();

//registra alquiler
export async function registrarAlquiler(req: Request, res: Response) {
  const { garageId, usuarioId, duracionHoras, servicios, vehiculoId } = req.body;
  
  try {
    await alquilerRepo.registrarAlquiler(garageId, usuarioId, duracionHoras, servicios, vehiculoId);
    res.status(200).json({ message: 'Alquiler registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el alquiler:', error); 
    res.status(500).json({ error: 'Error al registrar el alquiler' });
  }
}

// consulta alquileres
export async function consultarAlquileres(req: Request, res: Response) {
  const usuarioId = parseInt(req.params.usuarioId, 10);

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

