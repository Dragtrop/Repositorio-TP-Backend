export interface Alquiler{
    id: number;
    garageId: number;
    usuarioId: number;
    fechaAlquiler: string;
    duracionHoras: number;
    servicios: string;
    vehiculoId: number;
}