import { Component, OnInit } from '@angular/core';
import { GaragesService } from '../../services/garages.service';
import { Garages } from '../../interfaces/garages.js';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  garages: Garages[] = [];

  constructor(
    private garagesService: GaragesService, 
    private router: Router
  ) {}

  //muestra garages

  ngOnInit(): void {
    this.garagesService.ConsultarGarage().subscribe({
      next: (garages) => this.garages = garages,
      error: (err) => console.error('Error al cargar las cocheras:', err)
    });
  }

  //lógica para ordenar garages

  ordenarGarages(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const criterio = selectElement.value;
  
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
  

  // lógica de alquiler 

  alquilarGarage(garage: Garages): void {
    this.router.navigate(['/detalle-alquiler', garage.id], { state: { garage: garage } });
  }
}