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

    public async findOne(item: { id: string }): Promise<Garage | undefined> {
    if (!item.id || isNaN(Number(item.id))) {
        throw new Error('El id proporcionado no es válido');
    }

    const nroGarage = Number(item.id);

    const [garages] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM garages WHERE nroGarage = ?',
        [nroGarage]
    );

    if (garages.length === 0) {
        return undefined;
    }

    return garages[0] as Garage;
}


    public async add(garageInput:Garage): Promise<Garage  | undefined>{
        const {id,nroGarage, ...garageRow} = garageInput
        const [result] = await pool.query<ResultSetHeader>("Insert into garages set ?", [garageRow])
        garageInput.id = result.insertId
        garageInput.nroGarage = result.insertId

        await pool.query('UPDATE garages SET nroGarage = ? WHERE id = ?', [garageInput.nroGarage,  garageInput.id]);


        return garageInput
    }

    public async update(id: string, garageInput: Garage): Promise<Garage | undefined> {

        const nroGarage = Number.parseInt(id)
        const { ...garageRow } = garageInput

        await pool.query(
            'UPDATE garages SET ? WHERE nroGarage = ?',
            [garageRow, nroGarage]
        )

        return await this.findOne({ id })
    }


    public async delete(item: {id:string}):Promise<Garage | undefined>{
        try {
            const nroGarage = Number.parseInt(item.id)

            const garageToDelete = await this.findOne({ id: item.id })

            await pool.query(
                'DELETE FROM garages WHERE nroGarage = ?',
                [nroGarage]
            )

            return garageToDelete
        }
        catch(error:any){
            throw new Error('No se pudo borrar el garage')
        }
    }


    public async findByOwner(idDueno: number): Promise<Garage[] | undefined> {
    const [garages] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM garages WHERE idDueno = ?',
        [idDueno]
    );

        return garages as Garage[];
    }

    public async deleteByNro(nroGarage: number): Promise<Garage | undefined> {
    const [garages] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM garages WHERE nroGarage = ?',
        [nroGarage]
    );

    if (garages.length === 0) return undefined;

    await pool.query(
        'DELETE FROM garages WHERE nroGarage = ?',
        [nroGarage]
    );

    return garages[0] as Garage;
    }

public async findAllPaginated(
  limit: number,
  offset: number
): Promise<{ data: Garage[]; total: number }> {

  const [data] = await pool.query(
    'SELECT * FROM garages LIMIT ? OFFSET ?',
    [limit, offset]
  );

  const [[{ total }]]: any = await pool.query(
    'SELECT COUNT(*) as total FROM garages'
  );

  return {
    data: data as Garage[],
    total
  };
}

public async findAllWithoutPagination(): Promise<Garage[] | undefined> {
    const [garages] = await pool.query('SELECT * FROM garages');
    return garages as Garage[];
}



}