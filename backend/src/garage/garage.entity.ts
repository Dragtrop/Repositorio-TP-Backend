import { Blob } from 'node:buffer'
import crypto from 'node:crypto'

export class Garage{
    constructor(
        public nroGarage: number,
        public direccion:string,
        public cantLugares:number,
        public valorCocheraxH:number,
        public idservicios:number,
        public id?: number,
        public idDueno?: number,
    ){}
}
