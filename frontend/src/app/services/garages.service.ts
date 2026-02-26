import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { Garages } from '../interfaces/garages';
import { HistorialPrecio } from '../interfaces/historial-precio';

@Injectable({
  providedIn: 'root'
})
export class GaragesService {

  private servidor: string;
  private appiusers: string;

  constructor(private http: HttpClient) { 
    this.servidor = "http://localhost:3000/api/";
    this.appiusers = "garages/";
  }

ConsultarGarage(page: number = 1, limit: number = 6) {
  return this.http.get<{ data: Garages[]; total: number }>(
    `${this.servidor}${this.appiusers}?page=${page}&limit=${limit}`
  );
}

  deletegarage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.servidor}${this.appiusers}${id}`);
  }

  addgarage(garage: Garages): Observable<void> {
    return this.http.post<void>(`${this.servidor}${this.appiusers}`, garage);
  }

  getgarage(id: number): Observable<Garages> {
    return this.http
      .get<{ data: Garages }>(`${this.servidor}${this.appiusers}${id}`)
      .pipe(map(response => response.data));
  }

  editgarage(id: number, garage: Garages): Observable<void> {
    return this.http.put<void>(`${this.servidor}${this.appiusers}${id}`, garage);
  }

  update(id: number, cantLugares: number): Observable<void> {
    return this.http.put<void>(
      `${this.servidor}${this.appiusers}${id}`,
      { cantLugares }
    );
  }

  ConsultarGaragePorDueno(idDueno: number): Observable<Garages[]> {
    return this.http
      .get<{ data: Garages[] }>(`${this.servidor}${this.appiusers}dueno/${idDueno}`)
      .pipe(map(response => response.data));
  }

  deleteGarageByNro(nroGarage: number): Observable<void> {
  return this.http.delete<void>(
    `${this.servidor}${this.appiusers}nro/${nroGarage}`
  );
  }

  // 🔹 NUEVO: Traer todos los garages sin paginar
ConsultarGarageTodos(): Observable<Garages[]> {
    return this.http.get<Garages[]>(`${this.servidor}${this.appiusers}todos`);
}

updateGarage(id: number, data: any) {
  return this.http.put(
    `http://localhost:3000/api/garages/${id}`,
    data
  );
}

getGarageById(id: number) {
  return this.http.get(
    `http://localhost:3000/api/garages/${id}`
  );
}

getHistorial(nroGarage: number): Observable<HistorialPrecio[]> {
  return this.http.get<HistorialPrecio[]>(
    `${this.servidor}${this.appiusers}historial/${nroGarage}`
  );
}

}
