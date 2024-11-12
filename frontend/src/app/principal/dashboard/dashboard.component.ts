import { Component, OnInit } from '@angular/core';
import { GaragesService } from '../../services/garages.service';
import { Garages } from '../../interfaces/garages.js';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { Alquiler } from '../../interfaces/alquiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  garages: Garages[] = [];
  garagesDisponibles: Garages[] = [];
  usuarioId: number = 0;
  vehiculoId: number = 0;
  alquileres: Alquiler[] = [];

  constructor(
    private router: Router,
    private garagesService: GaragesService,
    private alquilerService: AlquilerService,
    private authService: AuthService
  ) {}

 ngOnInit(): void {
  const currentUser = this.authService.getCurrentUser();
  if (currentUser) {
    this.usuarioId = currentUser.id;
    this.vehiculoId = currentUser.idve;
  }

  // Cargar los garages disponibles

  this.garagesService.ConsultarGarage().subscribe({
    next: (garages) => {
      this.garages = garages;
      this.cargarAlquileresYFiltrarGarages();
    },
    error: (err) => console.error('Error al cargar los garages:', err)
  });
}

cargarAlquileresYFiltrarGarages(): void {
  this.alquilerService.obtenerAlquileresPorUsuario(this.usuarioId).subscribe({
    next: (alquileres) => {
      this.alquileres = alquileres;
      console.log(this.alquileres);
      this.obtenerGaragesDisponibles();
    },
    error: (err) => console.error('Error al cargar los alquileres:', err)
  });
}

obtenerGaragesDisponibles(): void {
  const currentTime = new Date().getTime();

  this.garagesDisponibles = this.garages.filter(garage => {
    const alquilerActivo = this.alquileres.some(alquiler => {
      const tiempoFinAlquiler = new Date(alquiler.fechaAlquiler).getTime() + (alquiler.duracionHoras * 60 * 60 * 1000);
      if (currentTime > tiempoFinAlquiler && alquiler.garageId === garage.id) {
        const nuevaCantLugares = garage.cantLugares + 1;
        this.garagesService.update(garage.id, nuevaCantLugares).subscribe;
        garage.cantLugares = nuevaCantLugares;
        return false;
      }
      return alquiler.garageId === garage.id &&
             alquiler.usuarioId === this.usuarioId &&
             alquiler.vehiculoId === this.vehiculoId &&
             currentTime < tiempoFinAlquiler;
    });
    return !alquilerActivo;
  });
  console.log('Garages después de filtrar:', this.garagesDisponibles);
}


alquilarGarage(garage: Garages): void {
  console.log('Redirigiendo al detalle de alquiler:', garage.id);
  this.router.navigate(['/principal/detalle-alquiler', garage.id]);
}

// Ordena los garages

ordenarGarages(event: Event): void {
  const target = event.target as HTMLSelectElement;

  if (target && target.value) {
    const criterio = target.value;
    switch (criterio) {
      case 'valorAsc':
        this.garagesDisponibles.sort((a, b) => a.valorCocheraxH - b.valorCocheraxH);
        break;
      case 'valorDesc':
        this.garagesDisponibles.sort((a, b) => b.valorCocheraxH - a.valorCocheraxH);
        break;
      case 'direccionAsc':
        this.garagesDisponibles.sort((a, b) => a.direccion.localeCompare(b.direccion));
        break;
      case 'direccionDesc':
        this.garagesDisponibles.sort((a, b) => b.direccion.localeCompare(a.direccion));
        break;
      case 'cantLugaresAsc':
        this.garagesDisponibles.sort((a, b) => a.cantLugares - b.cantLugares);
        break;
      case 'cantLugaresDesc':
        this.garagesDisponibles.sort((a, b) => b.cantLugares - a.cantLugares);
        break;
      default:
        break;
    }
  }
}
}


