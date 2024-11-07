
import crypto from 'node:crypto'

export class Service{
    constructor(
        public nroServicio: number,
        public nombre: string,
        public valorServicio: number,
        public id?: number,       
    ){}
}

