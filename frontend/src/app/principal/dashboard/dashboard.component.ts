import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GaragesService } from '../../services/garages.service';
import { Garages } from '../../interfaces/garages';
import { AuthService } from '../../services/auth.service';
import { AlquilerService } from '../../services/alquiler.service';
import { Alquiler } from '../../interfaces/alquiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  garages: Garages[] = [];                // TODOS los garages
  garagesDisponibles: Garages[] = [];     // Filtrados y ordenados
  alquileres: Alquiler[] = [];

  usuarioId = 0;
  vehiculoId: number | null = null;

  currentPage = 1;
  limit = 6;
  totalGarages = 0;
  totalPages = 0;

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
      this.vehiculoId = currentUser.idve ?? null;
    }

    this.cargarTodosLosGarages();
  }

  cargarTodosLosGarages(): void {
    this.garagesService.ConsultarGarageTodos()
      .subscribe({
        next: (garages) => {
          this.garages = garages;
          this.totalGarages = garages.length;
          this.totalPages = Math.ceil(this.totalGarages / this.limit);
          this.cargarAlquileresYFiltrarGarages();
        },
        error: (err) => console.error('Error al cargar garages', err)
      });
  }

  cargarAlquileresYFiltrarGarages(): void {
    this.alquilerService.obtenerAlquileresPorUsuario(this.usuarioId)
      .subscribe({
        next: (alquileres) => {
          this.alquileres = alquileres;
          this.obtenerGaragesDisponibles();
        },
        error: (err) => console.error('Error al cargar alquileres', err)
      });
  }

  obtenerGaragesDisponibles(): void {
    const currentTime = new Date().getTime();

    this.garagesDisponibles = this.garages.filter(garage => {
      const alquilerActivo = this.alquileres.some(alquiler => {
        const tiempoFin =
          new Date(alquiler.fechaAlquiler).getTime() +
          alquiler.duracionHoras * 60 * 60 * 1000;

        return (
          alquiler.garageId === garage.nroGarage &&
          alquiler.usuarioId === this.usuarioId &&
          alquiler.vehiculoId === this.vehiculoId &&
          currentTime < tiempoFin
        );
      });

      return !alquilerActivo;
    });

    // Reiniciamos la página actual al filtrar
    this.currentPage = 1;
  }

  // 🔹 Ordenamiento sobre todos los garagesDisponibles
  ordenarGarages(event: Event): void {
    const criterio = (event.target as HTMLSelectElement).value;

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
    }

    // Reiniciamos la página actual al ordenar
    this.currentPage = 1;
  }

  // 🔹 Paginación en el frontend
  get garagesPaginaActual(): Garages[] {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    return this.garagesDisponibles.slice(start, end);
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  paginaSiguiente(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  alquilarGarage(garage: Garages): void {
    this.router.navigate(['/principal/detalle-alquiler', garage.nroGarage]);
  }
}
