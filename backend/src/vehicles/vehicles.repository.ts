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

    public async addausuario(vehicle: Vehicle): Promise<Vehicle> {
        const { patente, marca, codtipv } = vehicle;
        const [result] = await pool.query<ResultSetHeader>("INSERT INTO vehicles (patente, marca, codtipv) VALUES (?, ?, ?)", [patente, marca, codtipv]);
        
        if (result && result.insertId) {
            vehicle.id = result.insertId; 
        } else {
            throw new Error("Error al insertar el vehículo en la base de datos.");
        }
    
        return vehicle;



    
}

public async obtenerVehiculosConGarage(usuarioId: number): Promise<any> {
    try {
        const [vehiculos] = await pool.query(
            `SELECT v.id, v.patente, v.marca, v.codtipv, g.direccion as garageDireccion
             FROM vehicles v
             JOIN garages g ON v.garageId = g.id
             WHERE v.usuarioId = ?`, [usuarioId]
        );
        return vehiculos;
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        throw new Error('Error al obtener los vehículos');
    }
}


}