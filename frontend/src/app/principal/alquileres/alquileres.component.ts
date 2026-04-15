import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';
import { AuthService } from '../../services/auth.service';
import { PagoService } from '../../services/pago.service';
import { Alquiler } from '../../interfaces/alquiler';
import { User } from '../../interfaces/user';
import { Garages } from '../../interfaces/garages';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.scss']
})
export class AlquilerComponent implements OnInit {

alquileres: (Alquiler & { garageDetalles?: Garages })[] = [];
alquileresPaginados: (Alquiler & { garageDetalles?: Garages })[] = [];
currentUser: any = null;
userData: User | null = null;
pagando = false;

currentPage = 1;
limit = 2;
totalPages = 0;

constructor(
  private alquilerService: AlquilerService,
  private authService: AuthService,
  private pagoService: PagoService,
  private userService: UserService
) {}

ngOnInit(): void {
  this.currentUser = this.authService.getCurrentUser();
  if (this.currentUser) {
    this.obtenerAlquileres(this.currentUser.id);

    this.userService.getUser(this.currentUser.id).subscribe({
      next: (data: User) => this.userData = data,
      error: () => console.error('Error al cargar usuario')
    });
  }
}

  obtenerAlquileres(userId: number): void {
    this.alquilerService.obtenerAlquileresPorUsuario(userId)
      .subscribe((alquileres: Alquiler[]) => {
        this.alquileres = alquileres.sort(
          (a, b) => new Date(b.fechaAlquiler).getTime() - new Date(a.fechaAlquiler).getTime()
        );
        this.totalPages = Math.ceil(this.alquileres.length / this.limit);
        this.actualizarPagina();

        this.alquileres.forEach(alquiler => {
          this.alquilerService.obtenerGaragePorId(alquiler.garageId)
            .subscribe(response => {
              alquiler.garageDetalles = response.data;
            });
        });
      });
  }

  pagar(alquiler: Alquiler): void {
    this.pagando = true;
    this.pagoService.crearPreferencia(
      alquiler.id,
      alquiler.total,
      `Alquiler garage - ${alquiler.duracionHoras}hs`
    ).subscribe({
      next: (res) => {
        window.location.href = res.initPoint;
      },
      error: () => {
        alert('Error al procesar el pago. Intentá de nuevo.');
        this.pagando = false;
      }
    });
  }

  actualizarPagina(): void {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.alquileresPaginados = this.alquileres.slice(start, end);
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarPagina();
    }
  }

  paginaSiguiente(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.actualizarPagina();
    }
  }
}