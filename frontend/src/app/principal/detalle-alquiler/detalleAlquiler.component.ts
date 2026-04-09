import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlquilerService } from '../../services/alquiler.service';
import { Garages } from '../../interfaces/garages';
import { GaragesService } from 'src/app/services/garages.service';
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
    private authService: AuthService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {

    const nroGarage = this.route.snapshot.paramMap.get('id');

    if (nroGarage) {
      this.garagesService.getgarage(+nroGarage).subscribe({
        next: (garage) => {
          this.garage = garage;
          this.calcularTotal();
        },
        error: (err) => console.error('Error al cargar el garage:', err)
      });
    }

    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.usuarioId = currentUser.id;

      this.vehicleService.getVehicleByUser(this.usuarioId).subscribe({
        next: (vehiculos) => {
          if (vehiculos && vehiculos.length > 0) {
            this.vehiculoId = vehiculos[0].id;
            console.log("Vehículo cargado correctamente:", this.vehiculoId);
          } else {
            console.warn("El usuario no tiene vehículo asignado.");
          }
        },
        error: (err) => console.error("Error cargando vehículo:", err)
      });
    }
  }

  calcularTotal(): void {
    if (this.garage) {
      this.total = this.garage.valorCocheraxH * this.duracionHoras;
    }
  }

registrarAlquiler(): void {

  if (this.garage && this.usuarioId && this.vehiculoId) {

    let servicios = 1;

    this.alquilerService
      .registrarAlquiler(
        this.garage.nroGarage,
        this.usuarioId,
        this.duracionHoras,
        servicios,
        this.vehiculoId,
        this.total
      )
      .subscribe({
        next: () => {

          this.garagesService.alquilarGarage(this.garage!.nroGarage)
            .subscribe({
              next: (res) => {
                this.garage!.cantLugares = res.cantLugares;
                this.router.navigate(['/principal/dashboard']);
              },
              error: (err) =>
                console.error('Error al actualizar la cantidad de lugares:', err)
            });

        },
        error: (err) =>
          console.error('Error al registrar alquiler:', err)
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

  formatDuracionHoras(duracionHoras: number): string {
    const horas = Math.floor(duracionHoras);
    const minutos = Math.floor((duracionHoras - horas) * 60);
    const segundos = Math.round(((duracionHoras - horas) * 60 - minutos) * 60);
    return `${this.padTime(horas)}:${this.padTime(minutos)}:${this.padTime(segundos)}`;
  }

  padTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
