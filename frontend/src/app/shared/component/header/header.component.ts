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

  usuario: string = "";
  password: string = "";
  sectionTitle: string = "DASHBOARD";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setSectionTitle(event.urlAfterRedirects);
      }
    });
  }

  setSectionTitle(url: string): void {
    if (url.includes('dashboard')) {
      this.sectionTitle = 'DASHBOARD';
    } else if (url.includes('profile')) {
      this.sectionTitle = 'PROFILE';
    } else if (url.includes('alquiler')) {
      this.sectionTitle = 'ALQUILERES';
    }
  }

  logout(): void {
    this.authService.logout();
  }
}



