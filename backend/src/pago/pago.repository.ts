import { pool } from '../shared/db/conn.mysql.js';
import { RowDataPacket } from 'mysql2';

export class PagoRepository {

    public async getAlquileresByUsuario(usuarioId: number): Promise<any[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM alquileres WHERE usuarioId = ?',
            [usuarioId]
        );
        return rows;
    }

    public async guardarPreferencia(alquilerId: number, mpPreferenceId: string): Promise<void> {
        await pool.query(
            'UPDATE alquileres SET mpPreferenceId = ?, estadoPago = ? WHERE id = ?',
            [mpPreferenceId, 'en_proceso', alquilerId]
        );
    }
    public async actualizarEstadoPago(mpPaymentId: string, estado: string): Promise<void> {
    const fechaPago = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await pool.query(
        'UPDATE alquileres SET estadoPago = ?, mpPaymentId = ?, fechaPago = ? WHERE mpPaymentId = ? OR (estadoPago = "en_proceso" AND mpPreferenceId IS NOT NULL)',
        [estado, mpPaymentId, fechaPago, mpPaymentId]
    );
}
}