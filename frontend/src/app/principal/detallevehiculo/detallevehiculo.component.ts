import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Vehicles } from 'src/app/interfaces/vehicles';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-detallevehiculo',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './detallevehiculo.component.html',
  styleUrls: ['./detallevehiculo.component.scss'] 
})
export class DetallevehiculoComponent implements OnInit {
  errorMessage: string | null = null;
  vehiculo: Vehicles | null = null;
  userId: string | null = null;   
  addVehicleForm: FormGroup =  this.fb.group({
    patente: ['', Validators.required],
    marca: ['', Validators.required],
    codtipv: ['', Validators.required]
  }); 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehiclesService: VehicleService,
    private authService: AuthService,
    private userService:UserService,
  ) { }

  ngOnInit(): void {
    this.cargaVehiculo();


  }

  cargaVehiculo(): void {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser.idve) {
        this.vehiclesService.getVehicle(currentUser.idve).subscribe({
          next: (vehiculo) => {
            this.vehiculo = vehiculo;
            this.errorMessage = null;
          },
          error: (err) => {
            console.error('Error al cargar el vehículo:', err);
            this.errorMessage = 'No se pudo cargar la información del vehículo.';
          }
        });
      } else {
        throw new Error('vehículo no autenticado o ID de vehículo no disponible.');
      }
    } catch (error: unknown) {
      console.error('Error al obtener el vehículo:', error);

      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Ocurrió un error inesperado.';
      }
    }
  }
  onSubmit(): void {
    const formValue = this.addVehicleForm.value;
    
    const currentUser = this.authService.getCurrentUser();
  
    if (currentUser && currentUser.idve) {
      const vehicle: Vehicles = {
        ...formValue,  
        idve: currentUser.idve, 
      };
  
      this.vehiclesService.addvehicle(vehicle).subscribe({
        next: () => {
          console.log('Vehículo agregado exitosamente');
          this.router.navigate(['/principal/vehiculo']);
        },
        error: (err) => {
          console.error('Error al agregar vehículo:', err);
          this.errorMessage = 'No se pudo agregar el vehículo.';
        }
      });
    } else {
      this.errorMessage = 'Usuario no autenticado o idve no disponible.';
    }
  }
}


