import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GaragesService } from '../../../services/garages.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garage-form',
  templateUrl: './garage-form.component.html',
  styleUrls: ['./garage-form.component.scss']
})
export class GarageFormComponent {

  garageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private garageService: GaragesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.garageForm = this.fb.group({
      direccion: ['', Validators.required],
      cantLugares: ['', [Validators.required, Validators.min(1)]],
      valorCocheraxH: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.garageForm.invalid) {
    this.garageForm.markAllAsTouched();
    return;
  }

  const user = this.authService.getCurrentUser();

  if (!user) {
    alert("Error: no se pudo obtener el usuario logueado.");
    return;
  }

  const nuevoGarage = {
    ...this.garageForm.value,
    idDueno: user.id,
    activo: 1
  };

  this.garageService.addgarage(nuevoGarage).subscribe({
    next: () => {
      alert("Garage creado exitosamente");
      this.router.navigate(['/principal/mis-cocheras']);
    },
    error: (err) => {
      console.error(err);
      alert("Error al cargar el garage");
    }
  });
}

}

