import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

  export class ProfileComponent implements OnInit {
    user: User | null = null;
  
    constructor(private authService: AuthService) {}
  
    ngOnInit(): void {
      this.loadUserProfile();
    }
  
    loadUserProfile(): void {
      this.user = this.authService.getCurrentUser();
    }
  }
