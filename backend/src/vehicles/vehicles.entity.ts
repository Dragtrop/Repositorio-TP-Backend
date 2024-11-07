<<<<<<< HEAD
import crypto from 'node:crypto'

export class Vehicle{
    constructor(
        public marca: string,
        public patente:string,
        public id= crypto.randomUUID(),
    ){}
}

=======

import crypto from 'node:crypto'

export class Vehicle{
    constructor(
        public patente: string,
        public marca: string,
        public codtipv:number,
        public id?: number,
    ){}
}

>>>>>>> ecfb3e52c78e2a560e91173ed07166c3cca1b2d9
