import crypto from 'node:crypto'

export class VehicleType{
    constructor(
        public nombre: string,
        public codigo:string,
        public id= crypto.randomUUID(),
    ){}
}

