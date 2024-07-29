import crypto from 'node:crypto';
export class Location {
    constructor(codigoPostal, nombre, id = crypto.randomUUID()) {
        this.codigoPostal = codigoPostal;
        this.nombre = nombre;
        this.id = id;
    }
}
//# sourceMappingURL=location.entity.js.map