import { Repository } from "../shared/repository.js";
import { Garage } from "./garage.entity.js";
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { GarageRouter } from "./garage.routes.js";



export class GarageRepository implements Repository<Garage>{

public async findAll(): Promise<Garage[] | undefined> {
  const [garages] = await pool.query<RowDataPacket[]>(`
    SELECT g.*, pg.valor AS valorCocheraxH
    FROM garages g
    LEFT JOIN precio_garage pg
      ON pg.garage_id = g.nroGarage
      AND pg.precio_desde = (
        SELECT MAX(p2.precio_desde)
        FROM precio_garage p2
        WHERE p2.garage_id = g.nroGarage
      )
    WHERE g.activo = 1
  `);

  return garages as Garage[];
}

    public async findOne(item: { id: string }): Promise<Garage | undefined> {

  if (!item.id || isNaN(Number(item.id))) {
    throw new Error('El id proporcionado no es válido');
  }

  const nroGarage = Number(item.id);

  const [garages] = await pool.query<RowDataPacket[]>(`
    SELECT g.*, pg.valor AS valorCocheraxH
    FROM garages g
    LEFT JOIN precio_garage pg
      ON pg.garage_id = g.nroGarage
      AND pg.precio_desde = (
        SELECT MAX(p2.precio_desde)
        FROM precio_garage p2
        WHERE p2.garage_id = g.nroGarage
      )
    WHERE g.nroGarage = ?
  `, [nroGarage]);

  if (garages.length === 0) return undefined;

  return garages[0] as Garage;
}


    public async add(garageInput: Garage): Promise<Garage | undefined> {

    const { id, nroGarage, ...garageRow } = garageInput;

    const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO garages SET ?",
        [garageRow]
    );

    garageInput.id = result.insertId;
    garageInput.nroGarage = result.insertId;

    await pool.query(
        'UPDATE garages SET nroGarage = ? WHERE id = ?',
        [garageInput.nroGarage, garageInput.id]
    );

    await pool.query(
        `INSERT INTO precio_garage (garage_id, precio_desde, valor)
         VALUES (?, NOW(), ?)`,
        [garageInput.nroGarage, garageInput.valorCocheraxH]
    );

    return garageInput;
}

    public async update(id: string, garageInput: Garage): Promise<Garage | undefined> {

  const nroGarage = Number.parseInt(id);

  const [precioActualRows] = await pool.query<RowDataPacket[]>(`
    SELECT valor
    FROM precio_garage
    WHERE garage_id = ?
    ORDER BY precio_desde DESC
    LIMIT 1
  `, [nroGarage]);

  const precioActual = precioActualRows.length > 0
    ? precioActualRows[0].valor
    : null;

  if (
    garageInput.valorCocheraxH !== undefined &&
    precioActual !== null &&
    Number(garageInput.valorCocheraxH) !== Number(precioActual)
  ) {
    await pool.query(
      `INSERT INTO precio_garage (garage_id, precio_desde, valor)
       VALUES (?, NOW(), ?)`,
      [nroGarage, garageInput.valorCocheraxH]
    );
  }

  const { valorCocheraxH, ...garageData } = garageInput;

  await pool.query(
    'UPDATE garages SET ? WHERE nroGarage = ?',
    [garageData, nroGarage]
  );

  return await this.findOne({ id });
}


    public async delete(item: { id: string }): Promise<Garage | undefined> {

  const nroGarage = Number.parseInt(item.id);

  const garageToDelete = await this.findOne({ id: item.id });

  if (!garageToDelete) {
    return undefined;
  }

  await pool.query(
    'DELETE FROM garages WHERE nroGarage = ?',
    [nroGarage]
  );

  return garageToDelete;
}


public async findByOwner(idDueno: number): Promise<Garage[] | undefined> {
  const [garages] = await pool.query<RowDataPacket[]>(`
    SELECT g.*, pg.valor AS valorCocheraxH
    FROM garages g
    LEFT JOIN precio_garage pg
      ON pg.garage_id = g.nroGarage
      AND pg.precio_desde = (
        SELECT MAX(p2.precio_desde)
        FROM precio_garage p2
        WHERE p2.garage_id = g.nroGarage
      )
    WHERE g.idDueno = ? AND g.activo = 1
  `, [idDueno]);

  return garages as Garage[];
}

public async deleteByNro(nroGarage: number): Promise<Garage | undefined> {
    const [garages] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM garages WHERE nroGarage = ? AND activo = 1',
        [nroGarage]
    );

    if (garages.length === 0) return undefined;

    await pool.query(
        'UPDATE garages SET activo = 0 WHERE nroGarage = ?', 
        [nroGarage]
    );

    return garages[0] as Garage;
}

public async findAllPaginated(
  limit: number,
  offset: number
): Promise<{ data: Garage[]; total: number }> {

  const [data] = await pool.query<RowDataPacket[]>(`
    SELECT g.*, pg.valor AS valorCocheraxH
    FROM garages g
    LEFT JOIN precio_garage pg
      ON pg.garage_id = g.nroGarage
      AND pg.precio_desde = (
        SELECT MAX(p2.precio_desde)
        FROM precio_garage p2
        WHERE p2.garage_id = g.nroGarage
      )
    WHERE g.activo = 1
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  const [[{ total }]]: any = await pool.query(
    'SELECT COUNT(*) as total FROM garages WHERE activo = 1'
  );

  return {
    data: data as Garage[],
    total
  };
}

public async findAllWithoutPagination(): Promise<Garage[] | undefined> {
  return this.findAll();
}

public async getHistorialPrecios(nroGarage: number) {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT valor, precio_desde
    FROM precio_garage
    WHERE garage_id = ?
    ORDER BY precio_desde DESC
  `, [nroGarage]);

  return rows;
}

public async findByNroGarage(nroGarage: number): Promise<Garage | undefined> {
    const [garages] = await pool.query<RowDataPacket[]>(`
        SELECT g.*, pg.valor AS valorCocheraxH
        FROM garages g
        LEFT JOIN precio_garage pg
            ON pg.garage_id = g.nroGarage
            AND pg.precio_desde = (
                SELECT MAX(p2.precio_desde)
                FROM precio_garage p2
                WHERE p2.garage_id = g.nroGarage
            )
        WHERE g.nroGarage = ?
    `, [nroGarage]);

    if (garages.length === 0) return undefined;
    return garages[0] as Garage;
}

public async updateCantLugares(nroGarage: number, cantLugares: number): Promise<Garage | undefined> {
    await pool.query(
        'UPDATE garages SET cantLugares = ? WHERE nroGarage = ?',
        [cantLugares, nroGarage]
    );

    return this.findByNroGarage(nroGarage);
}

}