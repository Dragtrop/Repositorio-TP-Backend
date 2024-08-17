
import crypto from 'node:crypto'

export class User{
    constructor(
        public nroCliente:number,
        public nombre:string,
        public apellido:string,
        public telefono:number,
        public mail:string,
        public Rol:string,
        public id?: number,
    ){}
}

