import { Component,OnInit  } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { Vehicles } from 'src/app/interfaces/vehicles.js';
import { CommonModule } from '@angular/common';
import { VehicleType } from 'src/app/interfaces/vehicleType.js';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.scss'
})
export class VehiculoComponent implements OnInit {
  vehiculo: Vehicles | null = null;
  errorMessage: string | null = null;
  vehiculotipo : VehicleType | null = null;

  constructor(
    private vehiclesService: VehicleService,
    private authService: AuthService,
    private router: Router,
    private vehicletypeservice:VehicleTypeService,
  ) { }


  ngOnInit(): void {
    this.loadUserVehicle();
  }

  loadUserVehicle(): void {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser.idve) {
        this.vehiclesService.getVehicle(currentUser.idve).subscribe({
          next: (vehiculo) => {
            this.vehiculo = vehiculo;
            this.errorMessage = null;
          
              if (vehiculo.codtipv) {
              this.vehicletypeservice.getVehicleType(vehiculo.codtipv).subscribe({
                next: (tipoVehiculo) => {
                  this.vehiculotipo = tipoVehiculo;
                },
                error: (err) => {
                  console.error('Error al cargar el tipo de vehículo:', err);
                  this.errorMessage = 'No se pudo cargar el tipo de vehículo.';
                }
              });
            }
          },error: (err) => {
            console.error('Error al cargar el vehículo:', err);
            this.errorMessage = 'No se pudo cargar la información del vehículo.';
          }
        });
      }else {
        console.error('Usuario no autenticado o ID de vehículo no disponible.');
        this.errorMessage = 'Usuario no autenticado o ID de vehículo no disponible.';
      }
    }catch (error:unknown) {
      console.error('Error inesperado en loadUserVehicle:', error);
  
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Ocurrió un error inesperado.';
      }
    }}




    
  agregarVehiculo(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.router.navigate(['/principal/detalle-vehiculo']);
    } else {
      console.error('Usuario no autenticado');
    }
  }
  
}
