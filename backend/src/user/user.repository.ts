import { Repository } from "../shared/repository.js";
import { User } from "./user.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserRouter } from "./user.routes.js";



export class UserRepository implements Repository<User>{

    public async findAll(): Promise<User [] | undefined>{
       const [users] = await pool.query('select * from users')
        return users as User[]
    }

    public async findOne (item:{id: string }):Promise<User  | undefined>{
        const id = Number.parseInt(item.id)
        const [users] = await pool.query<RowDataPacket[]>('select * from users where id = ? ',[id])
        if(users.length === 0){
            return undefined
        }
        const user = users[0] as User
        return user

    }

    public async add(userInput:User): Promise<User  | undefined>{
        const {id, ...userRow} = userInput
        const [result] = await pool.query<ResultSetHeader>("Insert into users set ?", [userRow])
        userInput.id = result.insertId

        return userInput
    }

    public async update (id: string, userInput: User): Promise<User  | undefined> {
        console.log(userInput)
        const userId = Number.parseInt(id)
        const {... userRow} = userInput
        await pool.query('update users set ? where id = ?',[userRow, userId] )

        return await this.findOne({ id })
    }

    public async delete (item: {id:string}):Promise<User  | undefined>{
        try{
        const userToDelete = await this.findOne(item)
        const userId = Number.parseInt(item.id)
        await pool.query('delete from users where id = ?', userId)

        return userToDelete}        
        catch(error:any){
            throw new Error('No se pudo borrar el user')
        }
    }

}