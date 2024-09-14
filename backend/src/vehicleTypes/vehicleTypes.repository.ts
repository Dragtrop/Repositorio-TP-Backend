import { Repository } from "../shared/repository.js";
import { VehicleType } from "./vehicleType.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { characterRouterVehicleTypes } from "./vehicleTypes.routes.js";


export class VehicleTypesRepository implements Repository<VehicleType>{

    public async findAll(): Promise< VehicleType [] | undefined>{
      const [VehicleType] = await pool.query('select * from vehicleTypes')
      return VehicleType as VehicleType[]

   }

   public async findOne (item:{id: string }):Promise<VehicleType  | undefined>{
      const id = Number.parseInt(item.id)
      const [VehicleTypes] = await pool.query<RowDataPacket[]>('select * from VehicleTypes where id = ? ',[id])
      if(VehicleTypes.length === 0){
         return undefined
      }
      const VehicleType = VehicleTypes[0] as VehicleType
      return VehicleType
   }


   public async add(vehicleTypesInput:VehicleType): Promise<VehicleType  | undefined>{
      const {id,codigo, ...vehicleTypeRow} = vehicleTypesInput
      const [result] = await pool.query<ResultSetHeader>("Insert into VehicleTypes set ?", [vehicleTypeRow])
      vehicleTypesInput.id = result.insertId
      vehicleTypesInput.codigo = vehicleTypesInput.id 

      await pool.query('UPDATE VehicleTypes SET codigo = ? WHERE id = ?', [vehicleTypesInput.codigo, vehicleTypesInput.id]);
      return vehicleTypesInput

   }

   public async update (id: string, vehicleTypesInput: VehicleType): Promise<VehicleType  | undefined> {
      console.log(vehicleTypesInput)
      const vehicleTypeId = Number.parseInt(id)
      const {... vehicleTypeRow} = vehicleTypesInput
      await pool.query('update vehicleTypes set ? where id = ?',[vehicleTypeRow, vehicleTypeId] )

      return await this.findOne({ id })

   }
   public async delete (item: {id:string}):Promise<VehicleType  | undefined>{
      try{
         const vehicleTypeToDelete = await this.findOne(item)
         const vehicleTypeId = Number.parseInt(item.id)
         await pool.query('delete from vehicleTypes where id = ?', vehicleTypeId)
 
         return vehicleTypeToDelete}
         catch(error:any){
             throw new Error('No se pudo borrar el vehiculo')
         }
   }
}
