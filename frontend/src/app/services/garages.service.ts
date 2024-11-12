import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";
import { Garages } from '../interfaces/garages';


@Injectable({
  providedIn: 'root'
})
export class GaragesService {


  private servidor :string;
  private appiusers: string;


  constructor(private http :HttpClient) { 
    this.servidor = "http://localhost:3000/api/"
    this.appiusers = "garages/"
  }

  ConsultarGarage(): Observable<Garages[]>{
    return this.http.get<{data:Garages[]}>(`${this.servidor}${this.appiusers}`).pipe(map(response => response.data));
  }
  
  deletegarage(id:number): Observable<void>{
    return this.http.delete<void>(`${this.servidor}${this.appiusers}${id}`);

  }

  addgarage(garage:Garages):Observable<void>{
    return this.http.post<void>(`${this.servidor}${this.appiusers}`,garage);
  }

  getgarage(id: number): Observable<Garages> {
    return this.http.get<{ data: Garages }>(`${this.servidor}${this.appiusers}${id}`)
      .pipe(map(response => response.data));
  }
  editgarage(id:number,garage:Garages):Observable<void>{
    return this.http.put<void>(`${this.servidor}${this.appiusers}${id}`,garage);
  }

  update(id: number, cantLugares: number): Observable<void> {
    return this.http.put<void>(`${this.servidor}${this.appiusers}${id}`, { cantLugares });
}

}
