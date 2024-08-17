
import crypto from 'node:crypto'

export class Garage{
    constructor(
        public nroGarage: string,
        public direccion:string,
        public cantLugares:string,
        public valorCocheraxH:string,
        public id?: number,
    ){}
}

