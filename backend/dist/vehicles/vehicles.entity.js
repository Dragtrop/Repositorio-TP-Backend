import crypto from 'node:crypto';
export class Vehicle {
    constructor(marca, patente, id = crypto.randomUUID()) {
        this.marca = marca;
        this.patente = patente;
        this.id = id;
    }
}
//# sourceMappingURL=vehicles.entity.js.map