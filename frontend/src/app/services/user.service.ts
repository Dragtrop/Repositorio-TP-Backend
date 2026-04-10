import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private servidor = environment.apiUrl + '/api/login';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.servidor}/register`, user);
  }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post(`${this.servidor}/login`, { usuario, password });
  }

  consultarUsuarios(): Observable<User[]> {
    return this.http
      .get<{ data: User[] }>(this.servidor)
      .pipe(map(res => res.data));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<{ data: User }>(`${this.servidor}/${id}`)
      .pipe(map(res => res.data));
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.servidor, user);
  }

  editUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.servidor}/${id}`, user);
  }

  // baja lógica (usa la ruta DELETE que ahora hace UPDATE activo = 0)
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.servidor}/${id}`);
  }

  // activar usuario (nuevo)
  activateUser(id: number): Observable<any> {
    return this.http.put(`${this.servidor}/admin/${id}/activar`, {});
  }

  // (opcional) desactivar por PUT (si preferís no usar DELETE)
  desactivateUser(id: number): Observable<any> {
    return this.http.put(`${this.servidor}/admin/${id}/desactivar`, {});
  }
}

