import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Vehicles } from 'src/app/interfaces/vehicles';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {

  vehiculo: Vehicles | null = null;
  errorMessage: string | null = null;
  tieneVehiculo: boolean = false;

  constructor(
    private vehiclesService: VehicleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle(): void {

    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.errorMessage = 'Usuario no autenticado.';
      return;
    }

    this.vehiclesService.getVehicleByUser(currentUser.id).subscribe({
      next: (vehiculos: any) => {

        if (vehiculos && vehiculos.length > 0) {
          this.tieneVehiculo = true;
          this.vehiculo = vehiculos[0];
        } else {
          this.tieneVehiculo = false;
          this.vehiculo = null;
        }

      },
      error: (err) => {
        console.error(err);
        this.tieneVehiculo = false;
        this.vehiculo = null;
      }
    });
  }

  agregarVehiculo(): void {
    this.router.navigate(['/principal/detalle-vehiculo']);
  }

}
