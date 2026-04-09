import { Component, OnInit } from '@angular/core';
import { GaragesService } from '../../services/garages.service';
import { Garages } from '../../interfaces/garages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-cocheras',
  templateUrl: './mis-cocheras.component.html',
  styleUrls: ['./mis-cocheras.component.scss']
})
export class MisCocherasComponent implements OnInit {

  misGarages: any[] = [];

  constructor(
    private garageService: GaragesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      console.error('No hay usuario logueado');
      return;
    }

    this.cargarMisGarages();
  }

  cargarMisGarages(): void {
    this.garageService.getMisGarages()
      .subscribe({
        next: (response) => {
          const garages = response.data;

          this.misGarages = garages.map(g => ({
            ...g,
            expanded: false,
            historial: []
          }));
        },
        error: err => {
          console.error('Error al cargar cocheras del dueño', err);
        }
      });
  }

  toggleHistorial(garage: any) {
    this.misGarages.forEach(g => {
      if (g !== garage) g.expanded = false;
    });

    garage.expanded = !garage.expanded;

    if (garage.expanded && garage.historial.length === 0) {
      this.garageService.getHistorial(garage.nroGarage)
        .subscribe(data => {
          garage.historial = data;
        });
    }
  }

  eliminarGarage(nroGarage: number) {
    if (!confirm('¿Seguro que querés eliminar esta cochera?')) return;

    this.garageService.deleteGarageByNro(nroGarage).subscribe(() => {
      this.misGarages = this.misGarages.filter(
        g => g.nroGarage !== nroGarage
      );
    });
  }


  ordenarMisGarages(event: Event): void { 
    const value = (event.target as HTMLSelectElement).value; 
    switch (value) {
       case 'valorAsc': this.misGarages.sort((a, b) => a.valorCocheraxH - b.valorCocheraxH); 
       break; 
       case 'valorDesc': this.misGarages.sort((a, b) => b.valorCocheraxH - a.valorCocheraxH); 
       break; 
       case 'direccionAsc': this.misGarages.sort((a, b) => a.direccion.localeCompare(b.direccion)); 
       break; 
       case 'direccionDesc': this.misGarages.sort((a, b) => b.direccion.localeCompare(a.direccion)); 
       break; 
       case 'cantLugaresAsc': this.misGarages.sort((a, b) => a.cantLugares - b.cantLugares); 
       break; 
       case 'cantLugaresDesc': this.misGarages.sort((a, b) => b.cantLugares - a.cantLugares); 
       break; } }
  editarGarage(nroGarage: number): void {
    this.router.navigate(['/principal/editar-garage', nroGarage]);
  }
}