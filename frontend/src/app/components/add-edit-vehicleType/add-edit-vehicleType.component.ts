import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleType } from 'src/app/interfaces/vehicleType';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';

@Component({
  selector: 'app-add-edit-vehicle-type',
  templateUrl: './add-edit-vehicleType.component.html',
  styleUrls: ['./add-edit-vehicleType.component.scss']
})
export class AddEditVehicleTypeComponent {

  form: FormGroup;
  loading: boolean = false;
  operacion: string = "Agregar";
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<AddEditVehicleTypeComponent>,
    private fb: FormBuilder, private _vehicleTypeService: VehicleTypeService, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        codigo: ['', Validators.required],
        id: ['']
      });
      this.id = data.id;
    }

  ngOnInit(): void {
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
      this.getVehicleType(id);
    }
  }

  Cancelar() {
    this.dialogRef.close(false);
  }

  getVehicleType(id: number) {
    this._vehicleTypeService.getVehicleType(id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre,
        codigo: data.codigo,
        id: data.id
      });
    });
  }

  addEditVehicleType() {
    if (this.form.invalid) {
      return;
    }

    const vehicleType: VehicleType = {
      nombre: this.form.value.nombre,
      codigo: this.form.value.codigo,
      id: this.form.value.id
    };

    this.loading = true;
    if (this.id === undefined) {
      setTimeout(() => {
        this._vehicleTypeService.addVehicleType(vehicleType).subscribe(() => {
          this.loading = false;
          this.addComplete('agregado');
        });
      }, 1500);
    } else {
      this._vehicleTypeService.editVehicleType(this.id, vehicleType).subscribe(() => {
        this.addComplete('actualizado');
      });
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

  addComplete(operacion: string) {
    this._snackBar.open(`Tipo de Vehículo ${operacion} con éxito`, "", {
      duration: 2000
    });
  }
}
