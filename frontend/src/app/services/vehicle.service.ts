import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Vehicles } from '../interfaces/vehicles';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private servidor :string;
  private appivehicles: string;


  constructor(private http :HttpClient) { 
    this.servidor = "http://localhost:3000/"
    this.appivehicles = "vehicles"

  }

  ConsultarVehiculos(): Observable<Vehicles[]>{
    return this.http.get<Vehicles[]>(`${this.servidor}${this.appivehicles}`);
  }
  
}
