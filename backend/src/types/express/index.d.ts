import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        nroCliente: number;
        usuario: string;
        idve: number;
        nombre: string;
        apellido: string;
        mail: string;
        telefono: string;
        Rol: string;
        activo: number;
      };
    }
  }
}