import { Component, OnInit } from '@angular/core';
import { GaragesService } from '../../services/garages.service';
import { Garages } from '../../interfaces/garages.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  garages: Garages[] = [];

  constructor(private garagesService: GaragesService) {}

  //muestra garages

  ngOnInit(): void {
    this.garagesService.ConsultarGarage().subscribe({
      next: (garages) => this.garages = garages,
      error: (err) => console.error('Error al cargar las cocheras:', err)
    });
  }

  // logica de alquiler

  alquilarGarage(garage: Garages): void {
    const confirmacion = confirm("¿Alquilar garage?");
    if (confirmacion) {
        if (garage.cantLugares > 0) {
            garage.cantLugares -= 1;
            this.garagesService.updateCantLugares(garage.id, garage.cantLugares).subscribe({
                next: () => console.log("Cantidad de lugares actualizada en la base de datos"),
                error: (err) => console.error("Error al actualizar en la base de datos", err)
            });
        } else {
            alert("No hay lugares disponibles en este garage.");
        }
    }
}
}