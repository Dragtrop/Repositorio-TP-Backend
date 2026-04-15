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

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(event.urlAfterRedirects);
      }
    });
  }

private updateTitle(url: string): void {

  if (url.includes('detalle-alquiler')) {
    this.sectionTitle = 'DETALLE ALQUILER';
    return;
  }
  if (url.includes('edit-user')) {
    this.sectionTitle = 'EDITAR USUARIO';
    return;
  }
  if (url.includes('edit-vehicle')) {
    this.sectionTitle = 'EDITAR VEHÍCULO';
    return;
  }
  if (url.includes('edit-garage')) {
    this.sectionTitle = 'EDITAR GARAGE';
    return;
  }
  if (url.includes('edit-service')) {
    this.sectionTitle = 'EDITAR SERVICIO';
    return;
  }

  const segment = url.split('/').filter(seg => seg).pop()?.split('?')[0] || '';

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
    case 'list-user':
      this.sectionTitle = 'USUARIOS';
      break;
    default:
      this.sectionTitle = segment ? segment.toUpperCase() : 'DASHBOARD';
      break;
  }
}

  logout(): void {
    this.authService.logout();
  }
}
