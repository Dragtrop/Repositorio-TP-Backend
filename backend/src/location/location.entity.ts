import crypto from 'node:crypto'

export class Location {
    constructor(
        public codigoPostal: string,
        public nombre: string,
        public id = crypto.randomUUID(),
    ){}
}
