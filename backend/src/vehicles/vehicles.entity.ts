
import crypto from 'node:crypto'

export class Vehicle{
    constructor(
        public patente: string,
        public marca: string,
        public codtipv:number,
        public id?: number,
    ){}
}

