import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  /** Estado del sidebar en móvil */
  sidebarVisible = false;

  /** Alterna la visibilidad del sidebar */
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  /** Cierra el sidebar */
  closeSidebar() {
    this.sidebarVisible = false;
  }
}
