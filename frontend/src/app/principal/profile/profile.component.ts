import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.user = currentUser;
        this.errorMessage = null;
      } else {
        throw new Error('Usuario no encontrado. Por favor inicie sesión.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.user = null;
        this.errorMessage = error.message || 'Ha ocurrido un error inesperado.';
      } else {
        this.user = null;
        this.errorMessage = 'Ha ocurrido un error desconocido.';
      }
    }
  }
}
