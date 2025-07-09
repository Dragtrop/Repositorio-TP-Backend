import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../interfaces/alquiler';
import { Garages } from '../interfaces/garages';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private servidor: string;

  constructor(private httpClient: HttpClient) {
    this.servidor = 'http://localhost:3000/api/';
  }

  // Registrar un nuevo alquiler
  registrarAlquiler(
    garageId: number, 
    usuarioId: number, 
    duracionHoras: number, 
    servicios: number, 
    vehiculoId: number,
    total:number
  ): Observable<any> {
    return this.httpClient.post(`${this.servidor}alquileres`, {
      garageId,
      usuarioId,
      duracionHoras,
      servicios,
      vehiculoId,
      total
    });
  }

  obtenerAlquileresPorUsuario(userId: number): Observable<Alquiler[]> {
    return this.httpClient.get<Alquiler[]>(`${this.servidor}alquileres/${userId}`);
  }

  obtenerGaragePorId(id: number): Observable<Garages> {
    return this.httpClient.get<Garages>(`${this.servidor}garages/${id}`);
  }

  verificarDisponibilidad(garageId: number, fechaAlquiler: string): Observable<boolean> {

    return this.httpClient.get<boolean>(`${this.servidor}disponibilidad?garageId=${garageId}&fecha=${fechaAlquiler}`);
  }
}
