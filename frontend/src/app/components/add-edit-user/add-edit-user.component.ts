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
        id:['']
      })
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
    this._userService.getuser(id).subscribe(data =>{
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

    if(this.form.invalid){
      return;
    }

    const user: User = {

      nroCliente:this.form.value.nroCliente,
      nombre:this.form.value.nombre,
      apellido:this.form.value.apellido,
      telefono:this.form.value.telefono,
      mail:this.form.value.mail,
      Rol:this.form.value.Rol,
      usuario:this.form.value.usuario,
      password:this.form.value.password,
      id:this.form.value.id

    }

    this.loading =true;
    if(this.id == undefined){
      setTimeout(()=>{
        this._userService.adduser(user).subscribe(() =>{
          this.loading =false;
          this.addcomplete('agregado');
        })
  
      },1500)
  
    }else{
        
        this._userService.edituser(this.id,user).subscribe(data => {
        this.addcomplete('actualizado');
        
      })
    
    }
    this.loading =false;
    this.dialogRef.close(true);



  }
  addcomplete(operacion:string){
    this._snackBar.open(`User ${operacion} con exito`, "",{
      duration:2000
    });
  }
}
