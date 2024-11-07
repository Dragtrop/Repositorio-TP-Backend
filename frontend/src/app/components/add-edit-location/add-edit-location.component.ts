import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from 'src/app/interfaces/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent {

  form: FormGroup;
  loading: boolean = false;
  operacion: string = "Agregar";
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddEditLocationComponent>,
    private fb: FormBuilder,
    private _locationService: LocationService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      id: ['']
    });
    this.id = data.id;
  }

  ngOnInit(): void {
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar";
      this.getLocation(id);
    }
  }

  Cancelar() {
    this.dialogRef.close(false);
  }

  getLocation(id: number) {
    this._locationService.getLocation(id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre,
        codigoPostal: data.codigoPostal,
        id: data.id
      });
    });
  }

  addEditLocation() {
    if (this.form.invalid) {
      return;
    }

    const location: Location = {
      nombre: this.form.value.nombre,
      codigoPostal: this.form.value.codigoPostal,
      id: this.form.value.id
    };

    this.loading = true;
    if (this.id == undefined) {
      setTimeout(() => {
        this._locationService.addLocation(location).subscribe(() => {
          this.loading = false;
          this.addcomplete('agregado');
        });
      }, 1500);
    } else {
      this._locationService.editLocation(this.id, location).subscribe(() => {
        this.addcomplete('actualizado');
      });
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

  addcomplete(operacion: string) {
    this._snackBar.open(`Location ${operacion} con éxito`, "", {
      duration: 2000
    });
  }
}
