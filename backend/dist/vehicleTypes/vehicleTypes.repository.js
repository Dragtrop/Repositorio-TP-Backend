import { pool } from '../shared/db/conn.mysql.js';
export class VehicleTypesRepository {
    async findAll() {
        const [VehicleType] = await pool.query('select * from vehicleTypes');
        return VehicleType;
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        const [VehicleTypes] = await pool.query('select * from VehicleTypes where id = ? ', [id]);
        if (VehicleTypes.length === 0) {
            return undefined;
        }
        const VehicleType = VehicleTypes[0];
        return VehicleType;
    }
    async add(vehicleTypesInput) {
        const { id, codigo, ...vehicleTypeRow } = vehicleTypesInput;
        const [result] = await pool.query("Insert into VehicleTypes set ?", [vehicleTypeRow]);
        vehicleTypesInput.id = result.insertId;
        vehicleTypesInput.codigo = vehicleTypesInput.id;
        await pool.query('UPDATE VehicleTypes SET codigo = ? WHERE id = ?', [vehicleTypesInput.codigo, vehicleTypesInput.id]);
        return vehicleTypesInput;
    }
    async update(id, vehicleTypesInput) {
        console.log(vehicleTypesInput);
        const vehicleTypeId = Number.parseInt(id);
        const { ...vehicleTypeRow } = vehicleTypesInput;
        await pool.query('update vehicleTypes set ? where id = ?', [vehicleTypeRow, vehicleTypeId]);
        return await this.findOne({ id });
    }
    async delete(item) {
        try {
            const vehicleTypeToDelete = await this.findOne(item);
            const vehicleTypeId = Number.parseInt(item.id);
            await pool.query('delete from vehicleTypes where id = ?', vehicleTypeId);
            return vehicleTypeToDelete;
        }
        catch (error) {
            throw new Error('No se pudo borrar el vehiculo');
        }
    }
}
//# sourceMappingURL=vehicleTypes.repository.js.map