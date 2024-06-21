import crypto from 'node:crypto';
export class VehicleType {
    constructor(nombre, codigo, id = crypto.randomUUID()) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.id = id;
    }
}
//# sourceMappingURL=vehicleType.entity.js.map