import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }
}
