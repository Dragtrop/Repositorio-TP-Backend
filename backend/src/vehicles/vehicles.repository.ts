import { Repository } from "../shared/repository.js";
import { Vehicle } from "./vehicles.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { characterRouter } from "./vehicles.routes.js";

export class VehiclesRepository implements Repository<Vehicle>{

    public async findAll(): Promise<Vehicle [] | undefined>{
       const [vehicles] = await pool.query('select * from vehicles')
        return vehicles as Vehicle[]
    }

    public async findOne (item:{id: string }):Promise<Vehicle  | undefined>{
        const id = Number.parseInt(item.id)
        const [vehicles] = await pool.query<RowDataPacket[]>('select * from vehicles where id = ? ',[id])
        if(vehicles.length === 0){
            return undefined
        }
        const vehicle = vehicles[0] as Vehicle
        return vehicle

    }

    public async add(vehicleInput:Vehicle): Promise<Vehicle  | undefined>{
        const {id, ...vehicleRow} = vehicleInput
        const [result] = await pool.query<ResultSetHeader>("Insert into vehicles set ?", [vehicleRow])
        vehicleInput.id = result.insertId

        return vehicleInput
    }

    public async update (id: string, vehicleInput: Vehicle): Promise<Vehicle  | undefined> {
        console.log(vehicleInput)
        const vehicleId = Number.parseInt(id)
        const {... vehicleRow} = vehicleInput
        await pool.query('update vehicles set ? where id = ?',[vehicleRow, vehicleId] )

        return await this.findOne({ id })
    }

    public async delete (item: {id:string}):Promise<Vehicle  | undefined>{
        try{
        const vehicleToDelete = await this.findOne(item)
        const vehicleId = Number.parseInt(item.id)
        await pool.query('delete from vehicles where id = ?', vehicleId)

        return vehicleToDelete}        
        catch(error:any){
            throw new Error('No se pudo borrar el vehiculo')
        }
    }

}