import { AlquilerRepository } from './alquiler.repository';
import { Request, Response } from 'express';

const alquilerRepo = new AlquilerRepository();

export async function registrarAlquiler(req: Request, res: Response) {
  const { garageId, usuarioId, duracionHoras, servicios, vehiculoId } = req.body;

  try {
      await alquilerRepo.registrarAlquiler(garageId, usuarioId, duracionHoras, servicios, vehiculoId);
      res.status(200).json({ message: 'Alquiler registrado exitosamente' });
  } catch (error) {
      res.status(500).json({ error: 'Error al registrar el alquiler' });
  }
}
