import { Vehicle } from "./vehicles.entity.js";
const vehicles = [
    new Vehicle('Ford', 'AA-158-FD', 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
export class VehiclesRepository {
    findAll() {
        return vehicles;
    }
    findOne(item) {
        return vehicles.find((vehicle) => vehicle.id === item.id);
    }
    add(item) {
        vehicles.push(item);
        return item;
    }
    update(item) {
        const vehicleIdx = vehicles.findIndex((vehicle) => vehicle.id === item.id);
        if (vehicleIdx !== -1) {
            vehicles[vehicleIdx] = { ...vehicles[vehicleIdx], ...item };
        }
        return vehicles[vehicleIdx];
    }
    delete(item) {
        const vehicleIdx = vehicles.findIndex((vehicle) => vehicle.id === item.id);
        if (vehicleIdx !== -1) {
            const deletedVehicles = vehicles[vehicleIdx];
            vehicles.splice(vehicleIdx, 1);
            return deletedVehicles;
        }
    }
}
//# sourceMappingURL=vehicles.repository.js.map