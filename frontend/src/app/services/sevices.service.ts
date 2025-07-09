import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";
import { Service } from '../interfaces/services.js';


@Injectable({
  providedIn: 'root'
})


export class SevicesService {



  private servidor :string;
  private appiusers: string;


  constructor(private http :HttpClient) { 
    this.servidor = "http://localhost:3000/api/"
    this.appiusers = "services/"
    

  }

  ConsultarService(): Observable<Service[]>{
    return this.http.get<{data:Service[]}>(`${this.servidor}${this.appiusers}`).pipe(map(response => response.data));
  }
  
  deleteservice(id:number): Observable<void>{
    return this.http.delete<void>(`${this.servidor}${this.appiusers}${id}`);

  }

  addservice(service:Service):Observable<void>{
    return this.http.post<void>(`${this.servidor}${this.appiusers}`,service);
  }

  getservice(id: number): Observable<Service> {
    return this.http.get<{ data: Service }>(`${this.servidor}${this.appiusers}${id}`)
      .pipe(map(response => response.data));
  }
  editservice(id:number,service:Service):Observable<void>{
    return this.http.put<void>(`${this.servidor}${this.appiusers}${id}`,service);
  }}
