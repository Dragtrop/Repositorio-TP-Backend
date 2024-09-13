import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private servidor: string;
  private apiLocations: string;

  constructor(private http: HttpClient) {
    this.servidor = "http://localhost:3000/";
    this.apiLocations = "locations/";
  }

  consultarLocations(): Observable<Location[]> {
    return this.http.get<{ data: Location[] }>(`${this.servidor}${this.apiLocations}`).pipe(map(response => response.data));
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.servidor}${this.apiLocations}${id}`);
  }

  addLocation(location: Location): Observable<void> {
    return this.http.post<void>(`${this.servidor}${this.apiLocations}`, location);
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<{ data: Location }>(`${this.servidor}${this.apiLocations}${id}`)
      .pipe(map(response => response.data));
  }

  editLocation(id: number, location: Location): Observable<void> {
    return this.http.put<void>(`${this.servidor}${this.apiLocations}${id}`, location);
  }
}
