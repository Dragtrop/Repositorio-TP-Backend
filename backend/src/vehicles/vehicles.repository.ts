import { publicDecrypt } from "crypto";
import { Repository } from "../shared/repository.js";
import { Vehicle } from "./vehicles.entity.js";

const vehicles = [
    new Vehicle(
      'Ford',
      'AA-158-FD',
      'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    ),
]

export class VehiclesRepository implements Repository<Vehicle>{

    public findAll(): Vehicle [] | undefined{
        return vehicles
    }

    public findOne(item:{id: string; }):Vehicle | undefined{
       return vehicles.find((vehicle) => vehicle.id === item.id)
    }

    public add(item:Vehicle): Vehicle | undefined{
        vehicles.push(item)
        return item

    }

    public update(item: Vehicle): Vehicle | undefined {
        
        const vehicleIdx = vehicles.findIndex((vehicle) => vehicle.id === item.id)

        if(vehicleIdx !== -1){

            vehicles [vehicleIdx] = { ...vehicles[vehicleIdx], ...item}
        }  
        return vehicles[vehicleIdx]
    }

    public delete (item: {id:string}): Vehicle | undefined{
        const vehicleIdx = vehicles.findIndex((vehicle) => vehicle.id === item.id)

        if (vehicleIdx !==-1){      
            const deletedVehicles = vehicles[vehicleIdx]
            vehicles.splice(vehicleIdx,1)
            return deletedVehicles
        }
    
    
    }

}