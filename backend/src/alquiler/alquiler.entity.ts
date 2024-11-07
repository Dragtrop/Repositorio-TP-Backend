import crypto from 'node:crypto'

export interface Alquiler {
    id: number;
    garageId: number;
    userId: number;
    fechaAlquiler: string;
    duracionHoras: number;
    servicios: string;
    vehiculoId: number;
}