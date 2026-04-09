import { Request, Response } from 'express';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { PagoRepository } from './pago.repository.js';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!
});

const pagoRepository = new PagoRepository();

export class PagoController {

    public async getAlquileres(req: Request, res: Response): Promise<void> {
        try {
            const usuarioId = Number(req.params.usuarioId);
            const alquileres = await pagoRepository.getAlquileresByUsuario(usuarioId);
            res.json(alquileres);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los alquileres' });
        }
    }

    public async crearPreferencia(req: Request, res: Response): Promise<void> {
        try {
            const { alquilerId, total, descripcion } = req.body;

            const preference = new Preference(client);
            const result = await preference.create({
                body: {
                    items: [
                        {
                            id: String(alquilerId),
                            title: descripcion || `Alquiler #${alquilerId}`,
                            quantity: 1,
                            unit_price: total,
                            currency_id: 'ARS'
                        }
                    ],
                    back_urls: {
                        success: `${process.env.FRONTEND_URL}/pagos/resultado?status=success`,
                        failure: `${process.env.FRONTEND_URL}/pagos/resultado?status=failure`,
                        pending: `${process.env.FRONTEND_URL}/pagos/resultado?status=pending`
                    },
                    auto_return: 'approved',
                    notification_url: `${process.env.BACKEND_URL}/api/pagos/webhook`
                }
            });

            await pagoRepository.guardarPreferencia(alquilerId, result.id!);

            res.json({ initPoint: result.init_point });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la preferencia de pago' });
        }
    }

    public async webhook(req: Request, res: Response): Promise<void> {
    try {
        console.log('WEBHOOK BODY:', JSON.stringify(req.body));
        const { type, data, topic, resource } = req.body;

        const paymentId = data?.id || resource;

        if ((type === 'payment' || topic === 'payment') && paymentId) {
            const payment = new Payment(client);
            const pagoMP = await payment.get({ id: paymentId });

            console.log('PAGO MP STATUS:', pagoMP.status);

            const estado = pagoMP.status === 'approved' ? 'aprobado'
                : pagoMP.status === 'rejected' ? 'rechazado'
                : 'en_proceso';

            await pagoRepository.actualizarEstadoPago(
                String(pagoMP.id),
                estado
            );
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
}