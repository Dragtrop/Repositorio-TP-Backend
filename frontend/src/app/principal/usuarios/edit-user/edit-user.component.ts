import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.user = data;
      }
    });
  }

  guardarCambios() {
  this.userService.editUser(this.user.id, this.user).subscribe({
    next: () => {
      alert('Usuario actualizado correctamente');
      this.router.navigate(['/principal/usuarios']);
    },
    error: (err) => {
      alert(err.error.message);
    }
  });
}


  cancelar() {
  this.router.navigate(['/principal/usuarios']);
}
}
