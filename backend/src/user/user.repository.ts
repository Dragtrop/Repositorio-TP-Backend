import { Repository } from "../shared/repository.js";
import { User } from "./user.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserRouter } from "./user.routes.js";
import bcrypt from "bcrypt";
import { Vehicle } from "../vehicles/vehicles.entity.js";

export class UserRepository implements Repository<User>{

public async login(userInput: { usuario: string; password: string }): Promise<User | undefined> {
        
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE usuario = ?",
            [userInput.usuario]
        );

        if (rows.length === 0) {
            return undefined;
        }

        const user = rows[0] as User;

        const isValid = bcrypt.compareSync(userInput.password, user.password);

        if (!isValid) {
            return undefined;
        }

        return user;

    } catch (error) {
        console.error("Error en el login del repositorio:", error);
        throw error;
    }
}



    public async create(userInput:User): Promise<User  | undefined>{

        const password = userInput.password; 
        const hashpassword = bcrypt.hashSync(password,10)
        userInput.password = hashpassword; 

        const [rows] = await pool.query<[RowDataPacket[], ResultSetHeader]>(
        "SELECT * FROM users WHERE usuario = ?",
        [userInput.usuario]
        );

        console.log(`Usuario ingresado: '${userInput.usuario}'`);

        if (rows.length > 0) {
            throw new Error("Usuario ya existe");
        }
        const {id,nroCliente, ...userRow} = userInput
        const [result] = await pool.query<ResultSetHeader>("Insert into users set ?", [userRow])
        userInput.id = result.insertId
        userInput.nroCliente = userInput.id 

        await pool.query('UPDATE users SET nroCliente = ? WHERE id = ?', [userInput.nroCliente, userInput.id]);
        return userInput

    }
    

    public async findAll(): Promise<User [] | undefined>{
       const [users] = await pool.query('select * from users')
        return users as User[]
    }


    async findByUsuario(usuario: string): Promise<User | null> {
        const [rows]: any = await pool.query('SELECT * FROM users WHERE usuario = ?', [usuario]);
        return rows.length > 0 ? rows[0] : null;
    }


    public async add(userInput:User): Promise<User  | undefined>{
        const {id,nroCliente, ...userRow} = userInput
        const [result] = await pool.query<ResultSetHeader>("Insert into users set ?", [userRow])
        userInput.id = result.insertId
        userInput.nroCliente = userInput.id 

        await pool.query('UPDATE users SET nroCliente = ? WHERE id = ?', [userInput.nroCliente, userInput.id]);
        return userInput
    }

    public async update(id: string, userInput: Partial<User>): Promise<User | undefined> {

    const userId = Number.parseInt(id);

    const allowedFields: any = {};

    if (userInput.nombre !== undefined) allowedFields.nombre = userInput.nombre;
    if (userInput.apellido !== undefined) allowedFields.apellido = userInput.apellido;
    if (userInput.telefono !== undefined) allowedFields.telefono = userInput.telefono;
    if (userInput.mail !== undefined) allowedFields.mail = userInput.mail;
    if (userInput.usuario !== undefined) allowedFields.usuario = userInput.usuario;
    if (userInput.password !== undefined) allowedFields.password = userInput.password;

    await pool.query(
        "UPDATE users SET ? WHERE id = ?",
        [allowedFields, userId]
    );

    return await this.findOne({ id });
}

    public async delete (item: {id:string}):Promise<User  | undefined>{
        const userToDelete = await this.findOne(item)
        if(!userToDelete) {
            return undefined;
        }

        const userId = Number.parseInt(item.id);

        try {
            const [result] = await pool.query<ResultSetHeader>(
                'UPDATE users SET activo = 0 WHERE id = ?',
                [userId]
            );
            // devolver el usuario antiguo (antes de la baja) para el controlador
            return userToDelete;
        } catch (error:any) {
            console.error("Error real al desactivar usuario:", error);
            throw error;
        }
    }

    public async activate (id: string): Promise<User | undefined> {
        const userId = Number.parseInt(id);
        try {
            await pool.query<ResultSetHeader>('UPDATE users SET activo = 1 WHERE id = ?', [userId]);
            return await this.findOne({ id });
        } catch (error:any) {
            console.error("Error al activar usuario:", error);
            throw error;
        }
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
      public async addVehicleToUser(userId: number, vehicleId: number): Promise<void> {
        await pool.query("UPDATE users SET idve = ? WHERE id = ?", [vehicleId, userId]);
      }

      public async findVehiclesByUser(userId: number): Promise<Vehicle[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
          "SELECT * FROM vehicles WHERE idve = ?",
          [userId]
        );
    

        return rows.map(row => row as Vehicle); 
      }     

}