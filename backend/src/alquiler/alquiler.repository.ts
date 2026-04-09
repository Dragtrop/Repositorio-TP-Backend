import { Repository } from "../shared/repository.js";
import { Alquiler } from "./alquiler.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AlquilerRouter } from "./alquiler.routes.js";

export class AlquilerRepository implements Repository<Alquiler> {

    public async registrarAlquiler(garageId: number, usuarioId: number, duracionHoras: number, servicios: number | null, vehiculoId: number,total:number): Promise<void> {
        
        const fechaAlquiler = new Date().toISOString().slice(0, 19).replace("T", " ");
        await pool.query(
          'INSERT INTO alquileres (garageId, usuarioId, duracionHoras, servicios, vehiculoId, fechaAlquiler,total) VALUES (? ,? , ?, ?, ?, ?, ?)',
          [garageId, usuarioId, duracionHoras, servicios, vehiculoId, fechaAlquiler,total]
        );
      }
    public async consultarAlquileres(usuarioId: number): Promise<any> {
        try {
        const [alquileres] = await pool.query('SELECT * FROM alquileres WHERE usuarioId = ?',
              [usuarioId]);
            return alquileres;
        }
            catch (error) {
            console.error('Error al consultar los alquileres:', error);
            throw new Error('Error al consultar los alquileres');
            }
    }

    public async findAll(): Promise<Alquiler[] | undefined> {
        const [alquileres] = await pool.query('SELECT * FROM alquileres');
        return alquileres as Alquiler[];
    }

    public async findOne(item: { id: string }): Promise<Alquiler | undefined> {
        const id = Number.parseInt(item.id);
        const [alquileres] = await pool.query<RowDataPacket[]>('SELECT * FROM alquileres WHERE id = ?', [id]);
        if (alquileres.length === 0) {
            return undefined;
        }
        const alquiler = alquileres[0] as Alquiler;
        return alquiler;
    }

    public async add(alquilerInput: Alquiler): Promise<Alquiler | undefined> {
        const { id, ...alquilerRow } = alquilerInput;
        const [result] = await pool.query<ResultSetHeader>("INSERT INTO alquileres SET ?", [alquilerRow]);
        alquilerInput.id = result.insertId;
    
        return alquilerInput;
    }
    

    public async update(id: string, alquilerInput: Alquiler): Promise<Alquiler | undefined> {
        console.log(alquilerInput);
        const alquilerId = Number.parseInt(id);
        const { ...alquilerRow } = alquilerInput;
        await pool.query('UPDATE alquileres SET ? WHERE id = ?', [alquilerRow, alquilerId]);

        return await this.findOne({ id });
    }

    public async delete(item: { id: string }): Promise<Alquiler | undefined> {
        try {
            const alquilerToDelete = await this.findOne(item);
            const alquilerId = Number.parseInt(item.id);
            await pool.query('DELETE FROM alquileres WHERE id = ?', [alquilerId]);

            return alquilerToDelete;
        } catch (error: any) {
            throw new Error('No se pudo borrar el alquiler');
        }
    }

    public async liberarAlquiler(alquilerId: number): Promise<void> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT garageId FROM alquileres WHERE id = ? AND liberado = FALSE',
      [alquilerId]
    );

    if (rows.length === 0) {
      await connection.release();
      return;
    }

    const garageId = rows[0].garageId;

    await connection.query(
      'UPDATE alquileres SET liberado = TRUE WHERE id = ?',
      [alquilerId]
    );

    await connection.query(
      'UPDATE garages SET cantLugares = cantLugares + 1 WHERE nroGarage = ?',
      [garageId]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
}