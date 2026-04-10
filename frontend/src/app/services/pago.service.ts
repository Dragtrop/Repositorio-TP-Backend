import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = `${environment.apiUrl}/api/pagos`;

  constructor(private http: HttpClient) {}

  crearPreferencia(alquilerId: number, total: number, descripcion: string): Observable<{ initPoint: string }> {
    return this.http.post<{ initPoint: string }>(`${this.apiUrl}/crear-preferencia`, {
      alquilerId,
      total,
      descripcion
    });
  }
}