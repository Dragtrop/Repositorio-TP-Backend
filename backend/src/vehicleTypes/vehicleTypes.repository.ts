import { publicDecrypt } from "crypto";
import { Repository } from "../shared/repository.js";
import { VehicleType } from "./vehicleType.entity.js";

const vehicleTypes = [
    new VehicleType(
      'Utilitario',
      '01',
      'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    ),
]

export class VehicleTypesRepository implements Repository<VehicleType>{

    public findAll(): VehicleType[] | undefined {
        return vehicleTypes;
    }

    public findOne(item: { id: string; }): VehicleType | undefined {
        return vehicleTypes.find((vehicleType) => vehicleType.id === item.id);
    }

    public add(item: VehicleType): VehicleType | undefined {
        vehicleTypes.push(item);
        return item;
    }

    public update(item: VehicleType): VehicleType | undefined {
        const vehicleTypeIdx = vehicleTypes.findIndex((vehicleType) => vehicleType.id === item.id);

        if (vehicleTypeIdx !== -1) {
            vehicleTypes[vehicleTypeIdx] = { ...vehicleTypes[vehicleTypeIdx], ...item };
        }  
        return vehicleTypes[vehicleTypeIdx];
    }

    public delete(item: { id: string }): VehicleType | undefined {
        const vehicleTypeIdx = vehicleTypes.findIndex((vehicleType) => vehicleType.id === item.id);

        if (vehicleTypeIdx !== -1) {      
            const deletedVehicleType = vehicleTypes[vehicleTypeIdx];
            vehicleTypes.splice(vehicleTypeIdx, 1);
            return deletedVehicleType;
        }
    }
}
