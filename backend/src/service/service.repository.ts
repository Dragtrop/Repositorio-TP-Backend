import { Repository } from "../shared/repository.js";
import { Service } from "./service.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { serviceRouter } from "./service.routes.js";

export class ServicesRepository implements Repository<Service>{

    public async findAll(): Promise<Service [] | undefined>{
       const [services] = await pool.query('select * from services')
        return services as Service[]
    }

    public async findOne (item:{id: string }):Promise<Service  | undefined>{
        const id = Number.parseInt(item.id)
        const [services] = await pool.query<RowDataPacket[]>('select * from services where id = ? ',[id])
        if(services.length === 0){
            return undefined
        }
        const service = services[0] as Service
        return service

    }

    public async add(serviceInput:Service): Promise<Service  | undefined>{
        const {id, ...serviceRow} = serviceInput
        const [result] = await pool.query<ResultSetHeader>("Insert into services set ?", [serviceRow])
        serviceInput.id = result.insertId

        return serviceInput
    }

    public async update (id: string, serviceInput: Service): Promise<Service  | undefined> {
        console.log(serviceInput)
        const serviceId = Number.parseInt(id)
        const {... serviceRow} = serviceInput
        await pool.query('update services set ? where id = ?',[serviceRow, serviceId] )

        return await this.findOne({ id })
    }

    public async delete (item: {id:string}):Promise<Service  | undefined>{
        try{
        const serviceToDelete = await this.findOne(item)
        const serviceId = Number.parseInt(item.id)
        await pool.query('delete from services where id = ?', serviceId)

        return serviceToDelete}        
        catch(error:any){
            throw new Error('No se pudo borrar la service')
        }
    }

}