import { Repository } from "../shared/repository.js";
import { Location } from "./location.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { locationRouter } from "./location.routes.js";

export class LocationsRepository implements Repository<Location>{

    public async findAll(): Promise<Location [] | undefined>{
       const [locations] = await pool.query('select * from locations')
        return locations as Location[]
    }

    public async findOne (item:{id: string }):Promise<Location  | undefined>{
        const id = Number.parseInt(item.id)
        const [locations] = await pool.query<RowDataPacket[]>('select * from locations where id = ? ',[id])
        if(locations.length === 0){
            return undefined
        }
        const location = locations[0] as Location
        return location

    }

    public async add(locationInput:Location): Promise<Location  | undefined>{
        const {id, ...locationRow} = locationInput
        const [result] = await pool.query<ResultSetHeader>("Insert into locations set ?", [locationRow])
        locationInput.id = result.insertId

        return locationInput
    }

    public async update (id: string, locationInput: Location): Promise<Location  | undefined> {
        console.log(locationInput)
        const locationId = Number.parseInt(id)
        const {... locationRow} = locationInput
        await pool.query('update locations set ? where id = ?',[locationRow, locationId] )

        return await this.findOne({ id })
    }

    public async delete (item: {id:string}):Promise<Location  | undefined>{
        try{
        const locationToDelete = await this.findOne(item)
        const locationId = Number.parseInt(item.id)
        await pool.query('delete from locations where id = ?', locationId)

        return locationToDelete}        
        catch(error:any){
            throw new Error('No se pudo borrar la location')
        }
    }

}