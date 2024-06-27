import { publicDecrypt } from "crypto";
import { Repository } from "../shared/repository.js";
import { VehicleType } from "./vehicleType.entity.js";


export class VehicleTypesRepository implements Repository<VehicleType>{

    public async findAll(): Promise< VehicleType [] | undefined>{
        throw new Error('not implemented')

     }

    public findOne(item: { id: string; }): Promise< VehicleType | undefined>{
        throw new Error('not implemented')

     }
    public add(item: VehicleType): Promise< VehicleType | undefined>{
        throw new Error('not implemented')

     }

     public async update (id: string, vehicleInput: VehicleType): Promise<VehicleType  | undefined> {
        throw new Error('not implemented')

     }
    public delete(item: { id: string }): Promise< VehicleType | undefined>{
        throw new Error('not implemented')

     }
}
