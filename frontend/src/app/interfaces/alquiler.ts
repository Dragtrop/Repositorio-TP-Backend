export interface Alquiler {
    id: number;
    garageId: number;
    usuarioId: number;
    fechaAlquiler: string;
    duracionHoras: number;
    servicios: number;
    vehiculoId: number;
    total: number;
    liberado: boolean;
    estadoPago: 'pendiente' | 'aprobado' | 'rechazado' | 'en_proceso';
    mpPaymentId?: string;
    mpPreferenceId?: string;
    fechaPago?: string;
}