import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { VehicleType } from '../interfaces/vehicleType';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private servidor: string;
  private apiVehicleTypes: string;

  constructor(private http: HttpClient) {
    this.servidor = "http://localhost:3000/";
    this.apiVehicleTypes = "vehicle-types/"; 
  }

  ConsultarVehicleTypes(): Observable<VehicleType[]> {
    return this.http.get<{ data: VehicleType[] }>(`${this.servidor}${this.apiVehicleTypes}`)
      .pipe(map(response => response.data));
  }

  deleteVehicleType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.servidor}${this.apiVehicleTypes}${id}`);
  }

  addVehicleType(vehicleType: VehicleType): Observable<void> {
    return this.http.post<void>(`${this.servidor}${this.apiVehicleTypes}`, vehicleType);
  }

  getVehicleType(id: number): Observable<VehicleType> {
    return this.http.get<{ data: VehicleType }>(`${this.servidor}${this.apiVehicleTypes}${id}`)
      .pipe(map(response => response.data));
  }

  editVehicleType(id: number, vehicleType: VehicleType): Observable<void> {
    return this.http.put<void>(`${this.servidor}${this.apiVehicleTypes}${id}`, vehicleType);
  }
}
