
import crypto from 'node:crypto'

export class Garage{
    constructor(
        public nroGarage: number,
        public direccion:string,
        public cantLugares:number,
        public valorCocheraxH:number,
        public id?: number,
    ){}
}

