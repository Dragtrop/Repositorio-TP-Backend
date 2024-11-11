import { Component } from '@angular/core';
import { AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']})
  
export class LoginComponent {
  usuario: string ="";
  password: string = "";

  constructor(private authService: AuthService,private router: Router){}


  login():void{
    this.authService.login(this.usuario,this.password).subscribe({
      next:()=> this.router.navigate(["/principal/dashboard"]),
      error:(err)=> console.error('Login failed',err)
    })
  }
    
  }

