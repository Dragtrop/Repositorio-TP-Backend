import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  user: User | null = null;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();

    if (!this.user) {
      this.menuItems = [];
      return;   
    }

    switch (this.user.Rol) {
      case 'Cliente':
        this.menuItems = [
          { label: 'dashboard', route: '/principal/dashboard' },
          { label: 'profile', route: '/principal/profile' },
          { label: 'vehículo', route: '/principal/vehiculo' },
          { label: 'alquileres', route: '/principal/alquiler' }
        ];
        break;

      case 'Dueño':
        this.menuItems = [
          { label: 'dashboard', route: '/principal/dashboard' },
          { label: 'Crear Cochera', route: '/principal/garage/new' },
          { label: 'Mis Cocheras', route: '/principal/mis-cocheras' },
        ];
        break;

      case 'Admin':
        this.menuItems = [
          { label: 'dashboard', route: '/principal/dashboard' },
          { label: 'vehículos', route: '/vehiculos' },
          { label: 'tipo de vehículos', route: '/tipovehiculos' },
          { label: 'localizaciones', route: '/localizaciones' },
          { label: 'usuarios', route: '/principal/usuarios' },
          { label: 'garages', route: '/garages' },
          { label: 'servicios', route: '/servicios' }
        ];
        break;

      default:
        this.menuItems = [];
    }
  }
  onClose() {
    this.close.emit();
  }
}

