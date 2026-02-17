import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  nombre: string = '';
  apellido: string = '';
  telefono!: number;
  mail: string = '';
  usuario: string = '';
  password: string = '';
  Rol: string = 'Cliente';

  loading: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar(): void {
    this.loading = true;
    this.error = '';

    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      mail: this.mail,
      usuario: this.usuario,
      password: this.password,
      Rol: this.Rol,
      idve: null
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al registrar usuario';
      }
    });
  }
}
