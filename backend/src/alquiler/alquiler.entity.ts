import crypto from 'node:crypto'

export interface Alquiler {
    id: number;
    garageId: number;
    usuarioId: number;
    fechaAlquiler: string;
    duracionHoras: number;
    servicios: number;
    vehiculoId: number;
}