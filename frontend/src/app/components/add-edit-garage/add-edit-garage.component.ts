import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Garages } from 'src/app/interfaces/garages'; 
import { GaragesService } from 'src/app/services/garages.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-edit-garage',
  templateUrl: './add-edit-garage.component.html',
  styleUrls: ['./add-edit-garage.component.scss']
})
export class AddEditGarageComponent {

  

  form: FormGroup;
  loading:boolean = false;
  operacion:string = "Agregar";
  id:number | undefined ;




  constructor(public dialogRef: MatDialogRef<AddEditGarageComponent>,
    private fb:FormBuilder, 
    private _userService:GaragesService,
    private _snackBar : MatSnackBar,
    private router: Router,
     @Inject(MAT_DIALOG_DATA) public data:any){
      this.form = this.fb.group({
        nroGarage:[''],
        direccion:['',Validators.required], 
        cantLugares:['',Validators.required], 
        valorCocheraxH:['',Validators.required], 
        idservicios:[''],
        imagen:[''],
        id:[''],
        idDueno: ['', Validators.required]
      })
      this.id=data.id;
    };


  ngOnInit(): void{
    this.isEdit(this.id)
    this.isEdit(this.id)
  }

  isEdit(id:number | undefined){
    if(id !== undefined){
      this.operacion = "Editar ";
      this.getGarage(id);
    }

  }
  Cancelar(){
    this.dialogRef.close(false);
  }

  getGarage(id:number){
    this._userService.getgarage(id).subscribe(data =>{
      this.form.patchValue({
        nroGarage:data.nroGarage,
        direccion:data.direccion,
        cantLugares:data.cantLugares,
        valorCocheraxH:data.valorCocheraxH,
        idservicios:data.idservicios,
        id:data.id,
        idDueno:data.idDueno

      })  
    })
  }
addEditPersona() {
  if (this.form.invalid) return;

  const idUsuario = Number(localStorage.getItem('idUsuario'));

  const user: Garages = {
    nroGarage: this.form.value.nroGarage,
    direccion: this.form.value.direccion,
    cantLugares: this.form.value.cantLugares,
    valorCocheraxH: this.form.value.valorCocheraxH,
    idservicios: this.form.value.idservicios,
    id: this.form.value.id,
    idDueno: idUsuario
  };

  this.loading = true;

  if (!this.id) {
    this._userService.addgarage(user).subscribe({
  next: () => {
    this.loading = false;
    this.addcomplete('agregado');
    this.dialogRef.close(true);

    setTimeout(() => {
      this.router.navigate(['/principal/mis-cocheras']);
    }, 100);
  },
  error: () => {
    this.loading = false;
    this._snackBar.open('Error al crear la cochera', '', {
      duration: 2000
    });
  }
});


  } else {
    this._userService.editgarage(this.id, user).subscribe(() => {
      this.addcomplete('actualizado');
      this.dialogRef.close(true);
    });
  }
}

addcomplete(operacion: string) {
  this._snackBar.open(`Garage ${operacion} con éxito`, '', {
    duration: 2000
  });
}

}
