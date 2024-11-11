import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Garages } from 'src/app/interfaces/garages'; 
import { GaragesService } from 'src/app/services/garages.service';


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
    private fb:FormBuilder, private _userService:GaragesService ,private _snackBar : MatSnackBar ,
     @Inject(MAT_DIALOG_DATA) public data:any){
      this.form = this.fb.group({
        nroCochera:[''],
        direccion:['',Validators.required], 
        cantLugares:['',Validators.required], 
        valorCocheraxH:['',Validators.required], 
        idservicios:[''],
        imagen:[''],
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
      this.getGarage(id);
    }

  }
  Cancelar(){
    this.dialogRef.close(false);
  }
    /*
      nroCochera:number,
    direccion:string,
    cantLugar:number,
    valorcoch:number,
    id: number,
  */
  getGarage(id:number){
    this._userService.getgarage(id).subscribe(data =>{
      this.form.patchValue({
        nroCochera:data.nroCochera,
        direccion:data.direccion,
        cantLugares:data.cantLugares,
        valorCocheraxH:data.valorCocheraxH,
        idservicios:data.idservicios,
        imagen:data.imagen,
        id:data.id

      })  
    })
  }
  addEditPersona(){

    if(this.form.invalid){
      return;
    }

    const user: Garages = {

      nroCochera:this.form.value.nroCochera,
      direccion:this.form.value.direccion,
      cantLugares:this.form.value.cantLugares,
      valorCocheraxH:this.form.value.valorCocheraxH,
      idservicios:this.form.value.idservicios,
      imagen:this.form.value.imagen,
      id:this.form.value.id

    }

    this.loading =true;
    if(this.id == undefined){
      setTimeout(()=>{
        this._userService.addgarage(user).subscribe(() =>{
          this.loading =false;
          this.addcomplete('agregado');
        })
  
      },1500)
  
    }else{
        
        this._userService.editgarage(this.id,user).subscribe(data => {
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
