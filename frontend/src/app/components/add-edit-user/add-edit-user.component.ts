import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent {



  form: FormGroup;
  loading:boolean = false;
  operacion:string = "Agregar";
  id:number | undefined ;

  constructor(public dialogRef: MatDialogRef<AddEditUserComponent>,
    private fb:FormBuilder, private _userService:UserService ,private _snackBar : MatSnackBar ,
     @Inject(MAT_DIALOG_DATA) public data:any){
      this.form = this.fb.group({
        nroCliente:['' ],
        nombre:['',Validators.required], 
        apellido:['',Validators.required], 
        telefono:['',Validators.required], 
        mail:['',Validators.required], 
        Rol:['',Validators.required],
        usuario:['', Validators.required],
        password:['', Validators.required],
        idve:[null],
        id:['']
      });

      this.id=data.id;

    };


  ngOnInit(): void{
    this.isEdit(this.id)
  }

  isEdit(id:number | undefined){
    if(id !== undefined){
      this.operacion = "Editar ";
      this.getUser(id);
    }

  }
  Cancelar(){
    this.dialogRef.close(false);
  }

  getUser(id:number){
    this._userService.getUser(id).subscribe((data: User) => {
      this.form.patchValue({
        nroCliente:data.nroCliente,
        nombre:data.nombre,
        apellido:data.apellido,
        telefono:data.telefono,
        mail:data.mail,
        Rol:data.Rol,
        id:data.id

      })  
    })
  }
  addEditPersona(){

this.loading = true;

const user: User = {
  nroCliente: this.form.value.nroCliente,
  nombre: this.form.value.nombre,
  apellido: this.form.value.apellido,
  telefono: this.form.value.telefono,
  mail: this.form.value.mail,
  Rol: this.form.value.Rol,
  usuario: this.form.value.usuario,
  password: this.form.value.password,
  idve: this.form.value.idve,
  id: this.form.value.id,
  activo: 1
};

if (this.id == undefined) {
  this._userService.register(user).subscribe({
    next: () => {
      this.loading = false;
      this.addcomplete('agregado');
      this.dialogRef.close(true);
    },
    error: (err) => {
      this.loading = false;
      console.error(err);
      this._snackBar.open('Error al agregar usuario', '', { duration: 3000 });
    }
  });
} else {
  this._userService.editUser(this.id, user).subscribe({
    next: () => {
      this.loading = false;
      this.addcomplete('actualizado');
      this.dialogRef.close(true);
    },
    error: (err) => {
      this.loading = false;
      console.error(err);
      this._snackBar.open('Error al actualizar usuario', '', { duration: 3000 });
    }
  });
}

  }
  addcomplete(operacion:string){
    this._snackBar.open(`User ${operacion} con exito`, "",{
      duration:2000
    });
  }
}
