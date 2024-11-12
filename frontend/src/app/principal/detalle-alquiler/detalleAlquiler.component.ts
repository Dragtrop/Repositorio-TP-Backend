import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlquilerService } from '../../services/alquiler.service';
import { ActivatedRoute } from '@angular/router';
import { Garages } from '../../interfaces/garages';
import { Alquiler } from '../../interfaces/alquiler';
import { GaragesService } from 'src/app/services/garages.service';
import { Vehicles } from 'src/app/interfaces/vehicles';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle.service';



@Component({
  selector: 'app-detalle-alquiler',
  templateUrl: './detalleAlquiler.component.html',
  styleUrls: ['./detalleAlquiler.component.scss']
})
export class DetalleAlquilerComponent implements OnInit {
  garage: Garages | undefined;
  duracionHoras: number = 1;
  total: number = 0;
  usuarioId: number | null = null;
  vehiculoId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alquilerService: AlquilerService,
    private garagesService: GaragesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {      
    
    const garageId = this.route.snapshot.paramMap.get('id');
    if (garageId) {
      this.garagesService.getgarage(+garageId).subscribe({
        next: (garage) => {
          this.garage = garage;
          console.log('Garage obtenido:', this.garage);
          this.calcularTotal();
        },
        error: (err) => console.error('Error al cargar el garage:', err)
      });
    }
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      console.log('Usuario actual:', currentUser);
      this.usuarioId = currentUser.id; 
      this.vehiculoId = currentUser.idve;
    }
  }
  calcularTotal(): void {
    if (this.garage) {
      this.total = this.garage.valorCocheraxH * this.duracionHoras;
    }
  }
  registrarAlquiler(): void {
    if (this.garage && this.usuarioId && this.vehiculoId) {
      console.log('Registrando alquiler con datos:', {
        garageId: this.garage.id,
        usuarioId: this.usuarioId,
        duracionHoras: this.duracionHoras,
        vehiculoId: this.vehiculoId
      });
  
      let servicios = 1;
  
      this.alquilerService
        .registrarAlquiler(
          this.garage.id,
          this.usuarioId,
          this.duracionHoras,
          servicios,
          this.vehiculoId
        )
        .subscribe({
          next: () => {
            if (this.garage) {
              const nuevaCantLugares = this.garage.cantLugares - 1;
  
              this.garagesService.update(this.garage.id, nuevaCantLugares).subscribe({
                next: () => {
                  this.garage!.cantLugares = nuevaCantLugares;
                  this.router.navigate(['/principal/dashboard']);
                },
                error: (err) => console.error('Error al actualizar la cantidad de lugares:', err)
              });
            }
          },
          error: (err) => console.error('Error al registrar alquiler:', err)
        });
    } else {
      console.error('Datos faltantes:', {
        garage: this.garage,
        usuarioId: this.usuarioId,
        vehiculoId: this.vehiculoId
      });
      alert('Faltan datos necesarios para registrar el alquiler. Asegúrese de tener un vehículo asignado.');
    }
  }
  
  
}