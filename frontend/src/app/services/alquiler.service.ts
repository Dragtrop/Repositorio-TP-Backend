import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../interfaces/alquiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private servidor :string;
  private appiusers: string;

  constructor(private httpClient:HttpClient,private router:Router){ 
    this.servidor = "http://localhost:3000/api/"
    this.appiusers = "alquileres/alquileres"
    
  }

  registrarAlquiler(garageId: number, usuarioId: number, duracionHoras: number, servicios: number, vehiculoId: number): Observable<any> {
    return this.httpClient.post(`${this.servidor}alquileres`, {  
      garageId,
      usuarioId,
      duracionHoras,
      servicios,
      vehiculoId
    });
  }}