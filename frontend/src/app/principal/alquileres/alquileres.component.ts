import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Alquiler } from '../../interfaces/alquiler';
import { User } from '../../interfaces/user';
import { Garages } from '../../interfaces/garages';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.scss']
})
export class AlquilerComponent implements OnInit {
  alquileres: (Alquiler & { garageDetalles?: Garages })[] = [];
  currentUser: User | null = null;

  constructor(private alquilerService: AlquilerService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.obtenerAlquileres(this.currentUser.id);
    } else {
      console.error("No hay un usuario autenticado");
    }
  }
  
  obtenerAlquileres(userId: number): void {
    this.alquilerService.obtenerAlquileresPorUsuario(userId).subscribe((alquileres) => {
      this.alquileres = alquileres;

      this.alquileres.forEach((alquiler) => {
        this.alquilerService.obtenerGaragePorId(alquiler.garageId).subscribe((garageDetalles) => {
          alquiler.garageDetalles = garageDetalles;
        });
      });
    });
  }

  formatDuracionHoras(duracionHoras: number): string {
    const horas = Math.floor(duracionHoras); 
    const minutos = Math.floor((duracionHoras - horas) * 60);  
    const segundos = Math.round(((duracionHoras - horas) * 60 - minutos) * 60);  
    return `${this.padTime(horas)}:${this.padTime(minutos)}:${this.padTime(segundos)}`;
  }

  padTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
