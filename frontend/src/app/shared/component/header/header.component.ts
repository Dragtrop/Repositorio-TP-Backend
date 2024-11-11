import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  usuario: string ="";
  password: string = "";

  constructor(private authService: AuthService ){}


  logout():void{
    this.authService.logout();
  }
    
}



