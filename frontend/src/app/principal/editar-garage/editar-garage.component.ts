import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GaragesService } from '../../services/garages.service';
import { Garages } from '../../interfaces/garages';

@Component({
  selector: 'app-editar-garage',
  templateUrl: './editar-garage.component.html',
  styleUrls: ['./editar-garage.component.scss']
})
export class EditarGarageComponent implements OnInit {

  garageForm!: FormGroup;
  garageId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private garageService: GaragesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.garageId = Number(this.route.snapshot.paramMap.get('id'));

    this.garageForm = this.fb.group({
      direccion: ['', Validators.required],
      cantLugares: ['', Validators.required],
      valorCocheraxH: ['', Validators.required]
    });

    this.cargarGarage();
  }

  cargarGarage(): void {
  this.garageService.getGarageById(this.garageId)
    .subscribe((garage: Garages) => {
      this.garageForm.patchValue(garage);
    });
}

  onSubmit(): void {
    if (this.garageForm.invalid) return;

    this.garageService.updateGarage(this.garageId, this.garageForm.value)
      .subscribe(() => {
        this.router.navigate(['/principal/mis-cocheras']);
      });
  }
}
