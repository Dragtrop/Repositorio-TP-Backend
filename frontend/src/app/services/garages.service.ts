import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { Garages } from '../interfaces/garages';
import { HistorialPrecio } from '../interfaces/historial-precio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GaragesService {

  private servidor = environment.apiUrl + '/api/';
  private appiusers = "garages/";

  constructor(private http: HttpClient) {}

  ConsultarGarage(page: number = 1, limit: number = 6) {
    return this.http.get<{ data: Garages[]; total: number }>(
      `${this.servidor}${this.appiusers}?page=${page}&limit=${limit}`
    );
  }

  ConsultarGarageTodos(): Observable<Garages[]> {
    return this.http.get<Garages[]>(
      `${this.servidor}${this.appiusers}todos`
    );
  }

  getMisGarages(): Observable<{ data: Garages[] }> {
    return this.http.get<{ data: Garages[] }>(
      `${this.servidor}${this.appiusers}mis-garages`
    );
  }

  addgarage(garage: Garages): Observable<any> {
    return this.http.post(
      `${this.servidor}${this.appiusers}`,
      garage
    );
  }

  getgarage(id: number): Observable<Garages> {
    return this.http
      .get<{ data: Garages }>(
        `${this.servidor}${this.appiusers}${id}`
      )
      .pipe(map(response => response.data));
  }

  editgarage(id: number, garage: Garages): Observable<any> {
    return this.http.put(
      `${this.servidor}${this.appiusers}${id}`,
      garage
    );
  }

  deletegarage(id: number): Observable<any> {
    return this.http.delete(
      `${this.servidor}${this.appiusers}${id}`
    );
  }

  deleteGarageByNro(nroGarage: number): Observable<any> {
    return this.http.delete(
      `${this.servidor}${this.appiusers}nro/${nroGarage}`
    );
  }

  getHistorial(nroGarage: number): Observable<HistorialPrecio[]> {
    return this.http.get<HistorialPrecio[]>(
      `${this.servidor}${this.appiusers}historial/${nroGarage}`
    );
  }

  ConsultarGaragePorDueno(): Observable<Garages[]> {
  return this.http
    .get<{ data: Garages[] }>(`${this.servidor}${this.appiusers}mis-garages`)
    .pipe(map(response => response.data));
}

  update(id: number, cantLugares: number): Observable<void> {
  return this.http.put<void>(
    `${this.servidor}${this.appiusers}${id}`,
    { cantLugares }
  );
}

  getGarageById(id: number): Observable<Garages> {
  return this.http
    .get<{ data: Garages }>(`${this.servidor}${this.appiusers}${id}`)
    .pipe(map(response => response.data));
}

  updateGarage(id: number, data: any): Observable<void> {
  return this.http.put<void>(
    `${this.servidor}${this.appiusers}${id}`,
    data
  );
}

  alquilarGarage(idGarage: number, cantidad: number = 1) {
  return this.http.put<{ cantLugares: number }>(
    `${this.servidor}${this.appiusers}${idGarage}/alquilar`,
    { cantidad }
  );
}
}