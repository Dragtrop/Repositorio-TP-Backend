import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  isEditing: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {

    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.errorMessage = 'Usuario no autenticado.';
      return;
    }

    this.userService.getUser(currentUser.id).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: () => {
        this.errorMessage = 'Error al cargar el perfil.';
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
      this.loadUserProfile();
    }
  }

  guardarCambios(): void {

    if (!this.user) return;

    this.userService.editUser(this.user.id, this.user).subscribe({
      next: () => {
        alert('Perfil actualizado correctamente');
        this.isEditing = false;
        this.loadUserProfile();
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
}

