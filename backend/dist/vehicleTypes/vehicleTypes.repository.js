import { VehicleType } from "./vehicleType.entity.js";
const vehicleTypes = [
    new VehicleType('Utilitario', '01', 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
export class VehicleTypesRepository {
    findAll() {
        return vehicleTypes;
    }
    findOne(item) {
        return vehicleTypes.find((vehicleType) => vehicleType.id === item.id);
    }
    add(item) {
        vehicleTypes.push(item);
        return item;
    }
    update(item) {
        const vehicleTypeIdx = vehicleTypes.findIndex((vehicleType) => vehicleType.id === item.id);
        if (vehicleTypeIdx !== -1) {
            vehicleTypes[vehicleTypeIdx] = { ...vehicleTypes[vehicleTypeIdx], ...item };
        }
        return vehicleTypes[vehicleTypeIdx];
    }
    delete(item) {
        const vehicleTypeIdx = vehicleTypes.findIndex((vehicleType) => vehicleType.id === item.id);
        if (vehicleTypeIdx !== -1) {
            const deletedVehicleType = vehicleTypes[vehicleTypeIdx];
            vehicleTypes.splice(vehicleTypeIdx, 1);
            return deletedVehicleType;
        }
    }
}
//# sourceMappingURL=vehicleTypes.repository.js.map