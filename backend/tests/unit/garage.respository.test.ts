import { jest, describe, it, expect, beforeEach } from '@jest/globals';

const mockQuery = jest.fn();

await jest.unstable_mockModule('../../src/shared/db/conn.mysql.js', () => ({
  pool: { query: mockQuery },
}));

const { GarageRepository } = await import('../../src/garage/garage.repository.js');

const fakeGarage = {
  nroGarage: 1,
  direccion: 'Calle Falsa 123',
  cantLugares: 5,
  valorCocheraxH: 100,
  idservicios: 1,
  idDueno: 1,
};

let repository: InstanceType<typeof GarageRepository>;

beforeEach(() => {
  repository = new GarageRepository();
  mockQuery.mockReset();
});

describe('GarageRepository.findOne', () => {
  it('devuelve un garage si existe', async () => {
    mockQuery.mockResolvedValue([[fakeGarage]]);

    const result = await repository.findOne({ id: '1' });

    expect(result).toEqual(fakeGarage);
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });

  it('devuelve undefined si no existe', async () => {
    mockQuery.mockResolvedValue([[]]);

    const result = await repository.findOne({ id: '999' });

    expect(result).toBeUndefined();
  });

  it('lanza error si el ID no es válido', async () => {
    await expect(repository.findOne({ id: 'abc' })).rejects.toThrow(
      'El id proporcionado no es válido'
    );
    expect(mockQuery).not.toHaveBeenCalled();
  });
});

describe('GarageRepository.findAll', () => {
  it('devuelve lista de garages', async () => {
    mockQuery.mockResolvedValue([[fakeGarage]]);

    const result = await repository.findAll();

    expect(result).toEqual([fakeGarage]);
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });

  it('devuelve lista vacía si no hay garages', async () => {
    mockQuery.mockResolvedValue([[]]);

    const result = await repository.findAll();

    expect(result).toEqual([]);
  });
});

describe('GarageRepository.findByOwner', () => {
  it('devuelve los garages de un dueño', async () => {
    mockQuery.mockResolvedValue([[fakeGarage]]);

    const result = await repository.findByOwner(1);

    expect(result).toEqual([fakeGarage]);
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  it('devuelve lista vacía si el dueño no tiene garages', async () => {
    mockQuery.mockResolvedValue([[]]);

    const result = await repository.findByOwner(99);

    expect(result).toEqual([]);
  });
});

describe('GarageRepository.findAllPaginated', () => {
  it('devuelve datos paginados con total', async () => {
    mockQuery
      .mockResolvedValueOnce([[fakeGarage]])
      .mockResolvedValueOnce([[{ total: 10 }]]);

    const result = await repository.findAllPaginated(6, 0);

    expect(result.data).toEqual([fakeGarage]);
    expect(result.total).toBe(10);
    expect(mockQuery).toHaveBeenCalledTimes(2);
  });
});

describe('GarageRepository.add', () => {
  it('inserta un garage y devuelve el garage creado', async () => {
    mockQuery
      .mockResolvedValueOnce([{ insertId: 1 }])
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([{}]);

    const input = { ...fakeGarage };
    const result = await repository.add(input as any);

    expect(result?.nroGarage).toBe(1);
    expect(mockQuery).toHaveBeenCalledTimes(3);
  });
});

describe('GarageRepository.delete', () => {
  it('elimina un garage existente y lo devuelve', async () => {

    mockQuery
      .mockResolvedValueOnce([[fakeGarage]])
      .mockResolvedValueOnce([{}]);

    const result = await repository.delete({ id: '1' });

    expect(result).toEqual(fakeGarage);
    expect(mockQuery).toHaveBeenCalledTimes(2);
  });

  it('devuelve undefined si el garage no existe', async () => {
    mockQuery.mockResolvedValueOnce([[]]);

    const result = await repository.delete({ id: '999' });

    expect(result).toBeUndefined();
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });
});

describe('GarageRepository.deleteByNro', () => {
  it('elimina por nroGarage y devuelve el garage', async () => {
    mockQuery
      .mockResolvedValueOnce([[fakeGarage]])
      .mockResolvedValueOnce([{}]);

    const result = await repository.deleteByNro(1);

    expect(result).toEqual(fakeGarage);
  });

  it('devuelve undefined si no existe', async () => {
    mockQuery.mockResolvedValueOnce([[]]);

    const result = await repository.deleteByNro(999);

    expect(result).toBeUndefined();
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });
});

describe('GarageRepository.findByNroGarage', () => {
  it('devuelve un garage por nroGarage', async () => {
    mockQuery.mockResolvedValue([[fakeGarage]]);

    const result = await repository.findByNroGarage(1);

    expect(result).toEqual(fakeGarage);
  });

  it('devuelve undefined si no existe', async () => {
    mockQuery.mockResolvedValue([[]]);

    const result = await repository.findByNroGarage(999);

    expect(result).toBeUndefined();
  });
});

describe('GarageRepository.updateCantLugares', () => {
  it('actualiza cantLugares y devuelve el garage actualizado', async () => {
    const updated = { ...fakeGarage, cantLugares: 4 };
    mockQuery
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([[updated]]);

    const result = await repository.updateCantLugares(1, 4);

    expect(result?.cantLugares).toBe(4);
    expect(mockQuery).toHaveBeenCalledTimes(2);
  });
});

describe('GarageRepository.getHistorialPrecios', () => {
  it('devuelve el historial de precios de un garage', async () => {
    const historial = [
      { valor: 100, precio_desde: '2024-01-01' },
      { valor: 120, precio_desde: '2024-06-01' },
    ];
    mockQuery.mockResolvedValue([historial]);

    const result = await repository.getHistorialPrecios(1);

    expect(result).toEqual(historial);
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [1]);
  });
});