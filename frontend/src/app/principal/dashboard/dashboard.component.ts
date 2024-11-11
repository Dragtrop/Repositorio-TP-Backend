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

  // logica de alquiler

  alquilarGarage(garage: Garages): void {
    this.router.navigate(['/detalle-alquiler'], { state: { garage: garage } });
  }
}