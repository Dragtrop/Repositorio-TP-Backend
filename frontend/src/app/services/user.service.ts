import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private servidor :string;
  private appiusers: string;


  constructor(private http :HttpClient) { 
    this.servidor = "http://localhost:3000/"
    this.appiusers = "users/"
    

  }

  ConsultarUsuarios(): Observable<User[]>{
    return this.http.get<{data:User[]}>(`${this.servidor}${this.appiusers}`).pipe(map(response => response.data));
  }
  
  deleteuser(id:number): Observable<void>{
    return this.http.delete<void>(`${this.servidor}${this.appiusers}${id}`);

  }

  adduser(user:User):Observable<void>{
    return this.http.post<void>(`${this.servidor}${this.appiusers}`,user);
  }

  getuser(id: number): Observable<User> {
    return this.http.get<{ data: User }>(`${this.servidor}${this.appiusers}${id}`)
      .pipe(map(response => response.data));
  }
  edituser(id:number,user:User):Observable<void>{
    return this.http.put<void>(`${this.servidor}${this.appiusers}${id}`,user);
  }
}