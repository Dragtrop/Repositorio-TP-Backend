import { Component, OnInit } from '@angular/core';
import { GaragesService } from '../../services/garages.service';
import { Garages } from '../../interfaces/garages.js';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { Alquiler } from '../../interfaces/alquiler';

// Configuración básica del componente Angular 'DashboardComponent'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  garages: Garages[] = []; // Lista de todos los garages disponibles en el sistema
  garagesDisponibles: Garages[] = []; // Lista de garages disponibles que cumplen las condiciones de filtrado
  usuarioId: number = 0; // ID del usuario actual, se obtiene al inicializar el componente
  vehiculoId: number = 0; // ID del vehículo del usuario actual
  alquileres: Alquiler[] = []; // Lista de alquileres realizados por el usuario actual

  // Constructor del componente, inyectando servicios necesarios
  constructor(
    private router: Router, // Servicio para redireccionar entre rutas
    private garagesService: GaragesService, // Servicio para gestionar garages
    private alquilerService: AlquilerService, // Servicio para gestionar alquileres
    private authService: AuthService // Servicio para autenticación
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener usuario actual desde el servicio de autenticación
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.usuarioId = currentUser.id; // Guardar ID del usuario
      this.vehiculoId = currentUser.idve; // Guardar ID del vehículo del usuario
    }

    // Cargar lista de garages usando el servicio GaragesService
    this.garagesService.ConsultarGarage().subscribe({
      next: (garages) => {
        this.garages = garages; // Guardar garages en la variable local
        this.cargarAlquileresYFiltrarGarages(); // Cargar alquileres y aplicar filtro
      },
      error: (err) => console.error('Error al cargar los garages:', err)
    });
  }

  // Cargar alquileres del usuario y filtrar los garages
  cargarAlquileresYFiltrarGarages(): void {
    // Obtener alquileres del usuario actual usando el servicio AlquilerService
    this.alquilerService.obtenerAlquileresPorUsuario(this.usuarioId).subscribe({ //subscribe se usa para manejar la respuesta de una llama asíncrona
      next: (alquileres) => { //next es como sale por el lado positivo
        this.alquileres = alquileres; // Guardar alquileres en la variable local
        console.log(this.alquileres); // Para depuración: mostrar los alquileres en la consola
        this.obtenerGaragesDisponibles(); // Filtrar garages disponibles
      },
      error: (err) => console.error('Error al cargar los alquileres:', err)
    });
  }

  // Filtrar garages disponibles según los alquileres activos y el tiempo actual
  obtenerGaragesDisponibles(): void { //una función que no devuelve ningún valor
    const currentTime = new Date().getTime(); // Obtener la hora actual en milisegundos

    // Filtrar garages según disponibilidad
    this.garagesDisponibles = this.garages.filter(garage => { //toma una colección y devuelve un nuevo arreglo con condiciones cumplidas
      const alquilerActivo = this.alquileres.some(alquiler => { //si algún elemento cumple con la condición sale por el true
        // Calcular el tiempo de finalización de cada alquiler en milisegundos
        const tiempoFinAlquiler = new Date(alquiler.fechaAlquiler).getTime() + (alquiler.duracionHoras * 60 * 60 * 1000);
        
        // Si el tiempo actual supera el tiempo de finalización y el garage coincide, actualizar cantidad de lugares
        if (currentTime > tiempoFinAlquiler && alquiler.garageId === garage.id) {
          const nuevaCantLugares = garage.cantLugares + 1;
          this.garagesService.update(garage.id, nuevaCantLugares).subscribe; // Actualizar en el backend
          garage.cantLugares = nuevaCantLugares; // Actualizar en el frontend
          return false; // Garage no está activo
        }

        // Si el alquiler está activo, verificar que coincidan usuario, vehículo y garage
        return alquiler.garageId === garage.id &&
               alquiler.usuarioId === this.usuarioId &&
               alquiler.vehiculoId === this.vehiculoId &&
               currentTime < tiempoFinAlquiler;
      });
      return !alquilerActivo; // Retornar solo garages sin alquiler activo
    });
    console.log('Garages después de filtrar:', this.garagesDisponibles); // Para depuración
  }

  // Redireccionar a la página de detalle de alquiler cuando se alquila un garage
  alquilarGarage(garage: Garages): void {
    console.log('Redirigiendo al detalle de alquiler:', garage.id);
    this.router.navigate(['/principal/detalle-alquiler', garage.id]); // Redirigir a la página de detalle
  }

  // Ordenar la lista de garages según el criterio seleccionado
  ordenarGarages(event: Event): void {
    const target = event.target as HTMLSelectElement; // Obtener el elemento HTML seleccionado

    if (target && target.value) {
      const criterio = target.value; // Obtener valor de criterio
      switch (criterio) {
        case 'valorAsc': // Ordenar por valor de cochera ascendente
          this.garagesDisponibles.sort((a, b) => a.valorCocheraxH - b.valorCocheraxH);
          break;
        case 'valorDesc': // Ordenar por valor de cochera descendente
          this.garagesDisponibles.sort((a, b) => b.valorCocheraxH - a.valorCocheraxH);
          break;
        case 'direccionAsc': // Ordenar por dirección ascendente
          this.garagesDisponibles.sort((a, b) => a.direccion.localeCompare(b.direccion));
          break;
        case 'direccionDesc': // Ordenar por dirección descendente
          this.garagesDisponibles.sort((a, b) => b.direccion.localeCompare(a.direccion));
          break;
        case 'cantLugaresAsc': // Ordenar por cantidad de lugares ascendente
          this.garagesDisponibles.sort((a, b) => a.cantLugares - b.cantLugares);
          break;
        case 'cantLugaresDesc': // Ordenar por cantidad de lugares descendente
          this.garagesDisponibles.sort((a, b) => b.cantLugares - a.cantLugares);
          break;
        default:
          break;
      }
    }
  }
}



