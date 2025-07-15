import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sectionTitle = 'DASHBOARD';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Establecer título inicial según la URL actual
    this.updateTitle(this.router.url);

    // Suscribirse a cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(event.urlAfterRedirects);
      }
    });
  }

  private updateTitle(url: string): void {
    // Tomamos el último segmento no vacío de la ruta
    const segment = url.split('/').filter(seg => seg).pop() || '';
    switch (segment.toLowerCase()) {
      case 'dashboard':
        this.sectionTitle = 'DASHBOARD';
        break;
      case 'profile':
        this.sectionTitle = 'PROFILE';
        break;
      case 'alquiler':
      case 'alquileres':
        this.sectionTitle = 'ALQUILERES';
        break;
      case 'vehiculo':
      case 'vehiculos':
        this.sectionTitle = 'VEHÍCULOS';
        break;
      default:
        // Si no coincide, lo ponemos en mayúsculas o dejamos por defecto
        this.sectionTitle = segment ? segment.toUpperCase() : 'DASHBOARD';
        break;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
