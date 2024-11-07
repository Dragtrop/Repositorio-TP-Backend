import { Component, OnInit } from '@angular/core';
import { GaragesService } from '../../services/garages.service';
import { Garages } from '../../interfaces/garages.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  garages: Garages[] = [];

  constructor(private garagesService: GaragesService) {}

  ngOnInit(): void {
    this.garagesService.ConsultarGarage().subscribe({
      next: (garages) => this.garages = garages,
      error: (err) => console.error('Error al cargar las cocheras:', err)
    });
  }
alquilarGarage(garage: Garages): void {
  console.log('Alquilando la cochera:', garage); //lógica de alquilar garage
}
}