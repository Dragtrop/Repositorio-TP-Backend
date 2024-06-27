import { pool } from '../shared/db/conn.mysql.js';
export class VehiclesRepository {
    async findAll() {
        const [vehicles] = await pool.query('select * from vehicles');
        return vehicles;
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        const [vehicles] = await pool.query('select * from vehicles = ? ', [id]);
        if (vehicles.length === 0) {
            return undefined;
        }
        const vehicle = vehicles[0];
        return vehicle;
    }
    async add(vehicleInput) {
        const { id, ...vehicleRow } = vehicleInput;
        const [result] = await pool.query("Insert into vehicles set?", [vehicleRow]);
        vehicleInput.id = result.insertId;
        return vehicleInput;
    }
    async update(id, vehicleInput) {
        const vehicleId = Number.parseInt(id);
        const { ...vehicleRow } = vehicleInput;
        await pool.query('update vehicles set ? where id =?', [vehicleRow, vehicleId]);
        return await this.findOne({ id });
    }
    async delete(item) {
        try {
            const vehicleToDelete = await this.findOne(item);
            const vehicleId = Number.parseInt(item.id);
            await pool.query('delete from vehicles where id = ?', vehicleId);
            return vehicleToDelete;
        }
        catch (error) {
            throw new Error('No se pudo borrar el vehiculo');
        }
    }
}
//# sourceMappingURL=vehicles.repository.js.map