import crypto from 'node:crypto'

export class Vehicle{
    constructor(
        public marca: string,
        public patente:string,
        public id= crypto.randomUUID(),
    ){}
}

