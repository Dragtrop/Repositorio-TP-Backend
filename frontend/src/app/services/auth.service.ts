import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.js';
import { UserService } from './user.service.js';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private servidor :string;
  private appiusers: string;

  constructor(private httpClient:HttpClient,private router:Router){ 
    this.servidor = "http://localhost:3000/api/login"
    this.appiusers = "login/"
    
  }

  login(usuario:string,password:string): Observable<any>{
    return this.httpClient.post<any>(this.servidor,{usuario,password}).pipe(
      tap (response =>{
        if(response.token){
          console.log(response.token);
        }
      })
    )
  }
  private setToken(token:string):void{
    localStorage.setItem(this.appiusers,token);
  }

  private getToken():string | null{
    return localStorage.getItem(this.appiusers);
  }
  isAuthenticated(): boolean{
    const token  = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp = 1000;
    return Date.now() < exp;

  }

logout(): void{
  localStorage.removeItem(this.appiusers);
  this.router.navigate(['/login'])
}

getCurrentUser(): User | null {
  const token = this.getToken();
  if (token) {
    try {
      const payload = jwtDecode<any>(token); // Decodifica el token JWT
      return { 
        id: payload.id || 0,
        nombre: payload.nombre || '',
        apellido: payload.apellido || '',
        mail: payload.mail || '',
        nroCliente: payload.nroCliente || 0,
        telefono: payload.telefono || 0,
        Rol: payload.Rol || '',
        password: '', // Nunca devolver la contraseña en un perfil de usuario
        usuario: payload.usuario || ''
      };
    } catch (error) {
      console.error("Token inválido:", error);
      return null;
    }
  }
  return null;
}

}
