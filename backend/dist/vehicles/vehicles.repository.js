import { pool } from '../shared/db/conn.mysql.js';
export class VehiclesRepository {
    async findAll() {
        const [vehicles] = await pool.query('select * from vehicles');
        return vehicles;
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        const [vehicles] = await pool.query('select * from vehicles where id = ? ', [id]);
        if (vehicles.length === 0) {
            return undefined;
        }
        const vehicle = vehicles[0];
        return vehicle;
    }
    async add(vehicleInput) {
        const { id, ...vehicleRow } = vehicleInput;
        const [result] = await pool.query("Insert into vehicles set ?", [vehicleRow]);
        vehicleInput.id = result.insertId;
        return vehicleInput;
    }
    async update(id, vehicleInput) {
        console.log(vehicleInput);
        const vehicleId = Number.parseInt(id);
        const { ...vehicleRow } = vehicleInput;
        await pool.query('update vehicles set ? where id = ?', [vehicleRow, vehicleId]);
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
    async addausuario(vehicle) {
        const { patente, marca, codtipv } = vehicle;
        const [result] = await pool.query("INSERT INTO vehicles (patente, marca, codtipv) VALUES (?, ?, ?)", [patente, marca, codtipv]);
        if (result && result.insertId) {
            vehicle.id = result.insertId;
        }
        else {
            throw new Error("Error al insertar el vehículo en la base de datos.");
        }
        return vehicle;
    }
    async obtenerVehiculosConGarage(usuarioId) {
        try {
            const [vehiculos] = await pool.query(`SELECT v.id, v.patente, v.marca, v.codtipv, g.direccion as garageDireccion
             FROM vehicles v
             JOIN garages g ON v.garageId = g.id
             WHERE v.usuarioId = ?`, [usuarioId]);
            return vehiculos;
        }
        catch (error) {
            console.error('Error al obtener los vehículos:', error);
            throw new Error('Error al obtener los vehículos');
        }
    }
}
//# sourceMappingURL=vehicles.repository.js.map