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
  templateUrl: './detallevehiculo.component.html',
  styleUrls: ['./detallevehiculo.component.scss']
})
export class DetallevehiculoComponent implements OnInit {

  errorMessage: string | null = null;
  vehiculo: Vehicles | null = null;
  userId: string | null = null;

  addVehicleForm: FormGroup = this.fb.group({
    patente: ['', [
      Validators.required,
      Validators.pattern(/^([A-Z]{2}\d{3}[A-Z]{2}|[A-Z]{3}\d{3})$/)
    ]],
    marca: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehiclesService: VehicleService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

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
        throw new Error('Vehículo no autenticado o ID de vehículo no disponible.');
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

  toUpperCase(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.addVehicleForm.get('patente')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.errorMessage = 'Usuario no autenticado.';
      return;
    }

    const formValue = this.addVehicleForm.value;

    this.vehiclesService
      .addVehicleToUser(currentUser.id.toString(), formValue)
      .subscribe({
        next: () => {
          console.log('Vehículo agregado correctamente');
          this.router.navigate(['/principal/vehiculo']);
        },
        error: () => {
          this.errorMessage = 'No se pudo agregar el vehículo.';
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/principal/vehiculo']);
  }
}