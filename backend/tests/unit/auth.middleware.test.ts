import { jest, describe, it, expect } from '@jest/globals';
import request from 'supertest';

// ── Datos de prueba ───────────────────────────────────────────────────────────
const fakeGarage = {
  nroGarage: 1,
  direccion: 'Calle Falsa 123',
  cantLugares: 5,
  valorCocheraxH: 100,
  idservicios: 1,
  idDueno: 1,
};

// ── Mock del repository ───────────────────────────────────────────────────────
const mockRepo = {
  findAllPaginated:         jest.fn(),
  findOne:                  jest.fn(),
  add:                      jest.fn(),
  update:                   jest.fn(),
  delete:                   jest.fn(),
  findByOwner:              jest.fn(),
  deleteByNro:              jest.fn(),
  findAllWithoutPagination: jest.fn(),
  getHistorialPrecios:      jest.fn(),
  findByNroGarage:          jest.fn(),
  updateCantLugares:        jest.fn(),
};

await jest.unstable_mockModule('../../src/garage/garage.repository.js', () => ({
  GarageRepository: jest.fn().mockImplementation(() => mockRepo),
}));

await jest.unstable_mockModule('../../src/middlewares/auth.middleware.js', () => ({
  authMiddleware: (req: any, _res: any, next: any) => {
    req.user = { id: 1, nroCliente: 1, nombre: 'Juan', apellido: 'Pérez', mail: 'juan@test.com', Rol: 'Dueño' };
    next();
  },
  roleMiddleware: (_roles: string[]) => (req: any, res: any, next: any) => {
    if (!req.user) return res.status(401).json({ message: 'No autenticado' });
    if (!_roles.includes(req.user.Rol)) return res.status(403).json({ message: 'No autorizado' });
    next();
  },
}));

const { app } = await import('../../src/app.js');


describe('GET /api/garages/todos', () => {
  it('devuelve lista de garages', async () => {
    mockRepo.findAllWithoutPagination.mockResolvedValue([fakeGarage] as any);

    const res = await request(app).get('/api/garages/todos');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([fakeGarage]);
  });

  it('devuelve 500 si el repository falla', async () => {
    mockRepo.findAllWithoutPagination.mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/api/garages/todos');

    expect(res.status).toBe(500);
  });
});

describe('GET /api/garages/:id', () => {
  it('devuelve un garage por ID', async () => {
    mockRepo.findOne.mockResolvedValue(fakeGarage as any);

    const res = await request(app).get('/api/garages/1');

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(fakeGarage);
  });

  it('devuelve 404 si no existe el garage', async () => {
    mockRepo.findOne.mockResolvedValue(null as any);

    const res = await request(app).get('/api/garages/999');

    expect(res.status).toBe(404);
  });

  it('devuelve 400 si el ID no es un número', async () => {
    const res = await request(app).get('/api/garages/abc');

    expect(res.status).toBe(400);
  });
});

describe('POST /api/garages', () => {
  it('crea un garage correctamente', async () => {
    mockRepo.add.mockResolvedValue(fakeGarage as any);

    const res = await request(app)
      .post('/api/garages')
      .send({ direccion: 'Calle Falsa 123', cantLugares: 5, valorCocheraxH: 100 });

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual(fakeGarage);
  });
});

describe('PUT /api/garages/:id', () => {
  it('actualiza un garage correctamente', async () => {
    const updated = { ...fakeGarage, direccion: 'Nueva 456' };
    mockRepo.findOne.mockResolvedValue(fakeGarage as any);
    mockRepo.update.mockResolvedValue(updated as any);

    const res = await request(app)
      .put('/api/garages/1')
      .send({ direccion: 'Nueva 456', cantLugares: 3, valorCocheraxH: 150 });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(updated);
  });

  it('devuelve 403 si el usuario no es el dueño', async () => {
    mockRepo.findOne.mockResolvedValue({ ...fakeGarage, idDueno: 99 } as any);

    const res = await request(app)
      .put('/api/garages/1')
      .send({ direccion: 'X', cantLugares: 1, valorCocheraxH: 50 });

    expect(res.status).toBe(403);
  });

  it('devuelve 404 si el garage no existe', async () => {
    mockRepo.findOne.mockResolvedValue(null as any);

    const res = await request(app)
      .put('/api/garages/999')
      .send({ direccion: 'X', cantLugares: 1, valorCocheraxH: 50 });

    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/garages/:id', () => {
  it('elimina un garage correctamente', async () => {
    mockRepo.findOne.mockResolvedValue(fakeGarage as any);
    mockRepo.delete.mockResolvedValue(fakeGarage as any);

    const res = await request(app).delete('/api/garages/1');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Garage eliminado correctamente');
  });

  it('devuelve 403 si el usuario no es el dueño', async () => {
    mockRepo.findOne.mockResolvedValue({ ...fakeGarage, idDueno: 99 } as any);

    const res = await request(app).delete('/api/garages/1');

    expect(res.status).toBe(403);
  });

  it('devuelve 404 si el garage no existe', async () => {
    mockRepo.findOne.mockResolvedValue(null as any);

    const res = await request(app).delete('/api/garages/999');

    expect(res.status).toBe(404);
  });
});

describe('GET /api/garages/mis-garages', () => {
  it('devuelve los garages del dueño autenticado', async () => {
    mockRepo.findByOwner.mockResolvedValue([fakeGarage] as any);

    const res = await request(app).get('/api/garages/mis-garages');

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([fakeGarage]);
  });
});

describe('GET /api/garages/historial/:nroGarage', () => {
  it('devuelve el historial de precios de un garage', async () => {
    const historial = [
      { valor: 100, precio_desde: '2024-01-01' },
      { valor: 120, precio_desde: '2024-06-01' },
    ];
    mockRepo.getHistorialPrecios.mockResolvedValue(historial as any);

    const res = await request(app).get('/api/garages/historial/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(historial);
  });
});

describe('PUT /api/garages/:id/alquilar', () => {
  it('alquila un garage con lugares disponibles', async () => {
    const updated = { ...fakeGarage, cantLugares: 4 };
    mockRepo.findByNroGarage.mockResolvedValue(fakeGarage as any);
    mockRepo.updateCantLugares.mockResolvedValue(updated as any);

    const res = await request(app)
      .put('/api/garages/1/alquilar')
      .send({ cantidad: 1 });

    expect(res.status).toBe(200);
    expect(res.body.data.cantLugares).toBe(4);
  });

  it('devuelve 404 si el garage no existe', async () => {
    mockRepo.findByNroGarage.mockResolvedValue(null as any);

    const res = await request(app)
      .put('/api/garages/999/alquilar')
      .send({ cantidad: 1 });

    expect(res.status).toBe(404);
  });

  it('devuelve 400 si no hay lugares disponibles', async () => {
    mockRepo.findByNroGarage.mockResolvedValue({ ...fakeGarage, cantLugares: 0 } as any);

    const res = await request(app)
      .put('/api/garages/1/alquilar')
      .send({ cantidad: 1 });

    expect(res.status).toBe(400);
  });
});