import { Repository } from "../shared/repository.js";
import { Garage } from "./garage.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { GarageRouter } from "./garage.routes.js";



export class GarageRepository implements Repository<Garage>{

    public async findAll(): Promise<Garage [] | undefined>{
       const [garages] = await pool.query('select * from garages')
        return garages as Garage[]
    }

    public async findOne (item:{id: string }):Promise<Garage  | undefined>{
        const id = Number.parseInt(item.id)
        const [garages] = await pool.query<RowDataPacket[]>('select * from garages where id = ? ',[id])
        if(garages.length === 0){
            return undefined
        }
        const garage = garages[0] as Garage
        return garage

    }

    public async add(garageInput:Garage): Promise<Garage  | undefined>{
        const {id, ...garageRow} = garageInput
        const [result] = await pool.query<ResultSetHeader>("Insert into garages set ?", [garageRow])
        garageInput.id = result.insertId
        garageInput.nroGarage = result.insertId

        await pool.query('UPDATE garages SET nroGarage = ? WHERE id = ?', [garageInput.nroGarage,  garageInput.id]);


        return garageInput
    }

    public async update (id: string, garageInput: Garage): Promise<Garage  | undefined> {
        const garageId = Number.parseInt(id)
        const {... garageRow} = garageInput
        await pool.query('update garages set ? where id = ?',[garageRow, garageId] )

        return await this.findOne({ id })
    }

    public async delete (item: {id:string}):Promise<Garage  | undefined>{
        try{
        const garageToDelete = await this.findOne(item)
        const garageId = Number.parseInt(item.id)
        await pool.query('delete from garages where id = ?', garageId)

        return garageToDelete}        
        catch(error:any){
            throw new Error('No se pudo borrar el garage')
        }
    }

}