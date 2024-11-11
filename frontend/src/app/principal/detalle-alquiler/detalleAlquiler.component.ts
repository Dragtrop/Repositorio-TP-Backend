import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlquilerService } from '../../services/alquiler.service';
import { ActivatedRoute } from '@angular/router';
import { Garages } from '../../interfaces/garages';
import { Alquiler } from '../../interfaces/alquiler';

@Component({
  selector: 'app-detalle-alquiler',
  templateUrl: './detalleAlquiler.component.html',
  styleUrls: ['./detalleAlquiler.component.scss']
})
export class DetalleAlquilerComponent implements OnInit {
  garage: Garages | undefined;
  duracionHoras: number = 1;
  total: number = 0;

  constructor(
    private router: Router,
    private alquilerService: AlquilerService,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.garage = navigation?.extras?.state?.['garage'];
      this.calcularTotal();
    }
  }

  ngOnInit(): void {}

  calcularTotal(): void {
    if (this.garage) {
      this.total = this.garage.valorCocheraxH * this.duracionHoras;
    }
  }

  registrarAlquiler(): void {
    if (this.garage) {
      const usuarioId = 1; // Acá hay que buscar el id del usuario
      const vehiculoId = 1; // Acá hay que buscar le id del vehículo

      this.alquilerService.registrarAlquiler(
        this.garage.id,
        usuarioId,
        this.duracionHoras,
        [],
        vehiculoId
      ).subscribe({
        next: () => {
          alert('Alquiler registrado con éxito');
          this.router.navigate(['/principal/dashboard']);
        },
        error: (err) => console.error('Error al registrar alquiler:', err)
      });
    }
  }
}

