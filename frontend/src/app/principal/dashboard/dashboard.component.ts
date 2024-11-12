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
        this.obtenerGaragesDisponibles();
      },
      error: (err) => console.error('Error al cargar los garages:', err)
    });

    this.alquilerService.obtenerAlquileresPorUsuario(this.usuarioId).subscribe({
      next: (alquileres) => this.alquileres = alquileres,
      error: (err) => console.error('Error al cargar los alquileres:', err)
    });
  }

// Filtrar los garages disponibles

  obtenerGaragesDisponibles() {
    this.garagesDisponibles = this.garages.filter(garage => {
      const alquilerActivo = this.alquileres.some(alquiler => 
        alquiler.garageId === garage.id && alquiler.usuarioId === this.usuarioId && alquiler.vehiculoId === this.vehiculoId
      );
      return !alquilerActivo && garage.nroCochera;
    });
  }

  alquilarGarage(garage: Garages): void {
    console.log('Redirigiendo al detalle de alquiler:', garage.id);
    this.router.navigate(['/detalle-alquiler', garage.id]);
  }

// Ordena los garages

  ordenarGarages(event: Event): void {
    const target = event.target as HTMLSelectElement;
  
    if (target && target.value) {
      const criterio = target.value;
      switch (criterio) {
        case 'valorAsc':
          this.garages.sort((a, b) => a.valorCocheraxH - b.valorCocheraxH);
          break;
        case 'valorDesc':
          this.garages.sort((a, b) => b.valorCocheraxH - a.valorCocheraxH);
          break;
        case 'direccionAsc':
          this.garages.sort((a, b) => a.direccion.localeCompare(b.direccion));
          break;
        case 'direccionDesc':
          this.garages.sort((a, b) => b.direccion.localeCompare(a.direccion));
          break;
        case 'cantLugaresAsc':
          this.garages.sort((a, b) => a.cantLugares - b.cantLugares);
          break;
        case 'cantLugaresDesc':
          this.garages.sort((a, b) => b.cantLugares - a.cantLugares);
          break;
        default:
          break;
      }
    }
  }
}

