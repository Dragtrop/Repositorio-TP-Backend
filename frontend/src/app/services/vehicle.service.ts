import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";
import { Vehicles } from '../interfaces/vehicles';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private servidor :string;
  private appivehicles: string;


  constructor(private http :HttpClient) { 
    this.servidor = "http://localhost:3000/api/"
    this.appivehicles = "vehicles/"

  }

  ConsultarVehiculos(): Observable<Vehicles[]>{
    return this.http.get<{data:Vehicles[]}>(`${this.servidor}${this.appivehicles}`).pipe(map(response => response.data));
  }
  
  deletevehicle(id:number): Observable<void>{
    return this.http.delete<void>(`${this.servidor}${this.appivehicles}${id}`);

  }

  addvehicle(vehicle:Vehicles):Observable<void>{
    return this.http.post<void>(`${this.servidor}${this.appivehicles}`,vehicle);
  }

  getVehicle(id: number): Observable<Vehicles> {
    return this.http.get<{ data: Vehicles }>(`${this.servidor}${this.appivehicles}${id}`)
      .pipe(map(response => response.data));
  }
  editVehicle(id:number,vehicle:Vehicles):Observable<void>{
    return this.http.put<void>(`${this.servidor}${this.appivehicles}${id}`,vehicle);
  }

  addVehicleToUser(userId: string, vehicleData: any): Observable<any> {
    return this.http.post(`${this.servidor}${this.appivehicles}${userId}/vehicles`, vehicleData);
  }

  obtenerVehiculosConGarage(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.servidor}${this.appivehicles}${usuarioId}`);
  }

  getVehiclextv(id: number): Observable<Vehicles> {
    return this.http.get<{ data: Vehicles }>(`${this.servidor}${this.appivehicles}/vehiculos/'${id}`)
      .pipe(map(response => response.data));
  }}
