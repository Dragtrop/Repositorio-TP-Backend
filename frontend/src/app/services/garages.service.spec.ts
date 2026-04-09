import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GaragesService } from './garages.service';
import { Garages } from '../interfaces/garages';
import { HistorialPrecio } from '../interfaces/historial-precio.js';

const BASE = 'http://localhost:3000/api/garages/';

const fakeGarage: Garages = {
  nroGarage: 1,
  direccion: 'Calle Falsa 123',
  cantLugares: 5,
  valorCocheraxH: 100,
  idservicios: 1,
  idDueno: 1,
} as any;

describe('GaragesService', () => {
  let service: GaragesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GaragesService],
    });
    service = TestBed.inject(GaragesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify()); // verifica que no queden requests pendientes

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('ConsultarGarage', () => {
    it('hace GET con paginación y devuelve data y total', () => {
      const mockResponse = { data: [fakeGarage], total: 1 };

      service.ConsultarGarage(1, 6).subscribe(res => {
        expect(res.data).toEqual([fakeGarage]);
        expect(res.total).toBe(1);
      });

      const req = httpMock.expectOne(`${BASE}?page=1&limit=6`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('ConsultarGarageTodos', () => {
    it('hace GET a /todos y devuelve lista completa', () => {
      service.ConsultarGarageTodos().subscribe(res => {
        expect(res).toEqual([fakeGarage]);
      });

      const req = httpMock.expectOne(`${BASE}todos`);
      expect(req.request.method).toBe('GET');
      req.flush([fakeGarage]);
    });
  });

  describe('getMisGarages', () => {
    it('hace GET a /mis-garages y devuelve los garages del dueño', () => {
      service.getMisGarages().subscribe(res => {
        expect(res.data).toEqual([fakeGarage]);
      });

      const req = httpMock.expectOne(`${BASE}mis-garages`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: [fakeGarage] });
    });
  });

  describe('getgarage', () => {
    it('hace GET por ID y devuelve el garage', () => {
      service.getgarage(1).subscribe(res => {
        expect(res).toEqual(fakeGarage);
      });

      const req = httpMock.expectOne(`${BASE}1`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: fakeGarage });
    });
  });

  describe('addgarage', () => {
    it('hace POST y crea un garage', () => {
      const mockResponse = { message: 'Garage creado', data: fakeGarage };

      service.addgarage(fakeGarage).subscribe(res => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(BASE);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(fakeGarage);
      req.flush(mockResponse);
    });
  });

  describe('editgarage', () => {
    it('hace PUT y actualiza un garage', () => {
      const updated = { ...fakeGarage, direccion: 'Nueva 456' };

      service.editgarage(1, updated as any).subscribe(res => {
        expect(res.data).toEqual(updated);
      });

      const req = httpMock.expectOne(`${BASE}1`);
      expect(req.request.method).toBe('PUT');
      req.flush({ data: updated });
    });
  });

  describe('deletegarage', () => {
    it('hace DELETE por ID', () => {
      service.deletegarage(1).subscribe(res => {
        expect(res.message).toBe('Garage eliminado correctamente');
      });

      const req = httpMock.expectOne(`${BASE}1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ message: 'Garage eliminado correctamente' });
    });
  });

  describe('alquilarGarage', () => {
    it('hace PUT a /alquilar con cantidad', () => {
      service.alquilarGarage(1, 1).subscribe(res => {
        expect(res.cantLugares).toBe(4);
      });

      const req = httpMock.expectOne(`${BASE}1/alquilar`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ cantidad: 1 });
      req.flush({ cantLugares: 4 });
    });
  });

  describe('getHistorial', () => {
  it('hace GET al historial de precios', () => {
    const historial: HistorialPrecio[] = [
      { nroGarage: 1, precio: 100, fecha: new Date('2024-01-01') }
    ];

    service.getHistorial(1).subscribe(res => {
      expect(res).toEqual(historial);
    });

    const req = httpMock.expectOne(`${BASE}historial/1`);
    expect(req.request.method).toBe('GET');
    req.flush(historial);
  });
});
});