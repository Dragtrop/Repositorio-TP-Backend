export interface User{
    nroCliente: number;
    nombre: string;
    apellido: string;
    telefono: number;
    mail: string;
    Rol: string;
    password?: string | null;
    usuario?: string | null;
    idve?: number | null;
    id: number;
    activo: number; 
}
