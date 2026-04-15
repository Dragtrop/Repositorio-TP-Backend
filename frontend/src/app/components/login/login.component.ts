import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

login(): void {
  this.authService.login(this.usuario, this.password).subscribe({
    next: () => this.router.navigate(['/principal/dashboard']),
    error: (err) => console.error('Login failed', err)
  });
}
}
