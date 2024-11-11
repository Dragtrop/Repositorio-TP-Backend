<<<<<<< HEAD
<<<<<<< HEAD
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
    this.appiusers = "alquiler/"
    
  }

  registrarAlquiler(garageId: number, usuarioId: number, duracionHoras: number, servicios: string[], vehiculoId: number): Observable<any> {
    return this.httpClient.post(`${this.servidor}alquileres`, {
      garageId,
      usuarioId,
      duracionHoras,
      servicios: servicios.join(','),
      vehiculoId
    });
}

=======
=======
>>>>>>> 66a25c48cb71c9c2c3e6762375b40b5870af4796
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
    this.servidor = "http://localhost:3000/api/alquiler"
    this.appiusers = "alquiler/"
    
  }

registrarAlquiler(garageId: number, usuarioId: number, duracionHoras: number, servicios: string[], vehiculoId: number): Observable<any> {
    return this.httpClient.post(`${this.servidor}alquileres`, {
        garageId,
        usuarioId,
        duracionHoras,
        servicios: servicios.join(','),
        vehiculoId
    });
}

<<<<<<< HEAD
>>>>>>> 66a25c48cb71c9c2c3e6762375b40b5870af4796
=======
>>>>>>> 66a25c48cb71c9c2c3e6762375b40b5870af4796
}