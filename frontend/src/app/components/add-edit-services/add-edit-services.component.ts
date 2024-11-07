import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from 'src/app/interfaces/services.js';
import { SevicesService } from 'src/app/services/sevices.service';


@Component({
  selector: 'app-add-edit-services',
  templateUrl: './add-edit-services.component.html',
  styleUrls: ['./add-edit-services.component.scss']
})
export class AddEditServicesComponent {
  


  form: FormGroup;
  loading:boolean = false;
  operacion:string = "Agregar";
  id:number | undefined ;

  constructor(public dialogRef: MatDialogRef<AddEditServicesComponent>,
    private fb:FormBuilder, private _serviceService:SevicesService ,private _snackBar : MatSnackBar ,
     @Inject(MAT_DIALOG_DATA) public data:any){
      this.form = this.fb.group({
        nroServicio:['' ],
        nombre:['',Validators.required], 
        valorServicio:['',Validators.required], 
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
      this.getService(id);
    }

  }
  Cancelar(){
    this.dialogRef.close(false);
  }

  getService(id:number){
    this._serviceService.getservice(id).subscribe(data =>{
      this.form.patchValue({
        nroServicio:data.nroServicio,
        nombre:data.nombre,
        valorServicio:data.valorServicio,
        id:data.id

      })  
    })
  }
  addEditPersona(){

    if(this.form.invalid){
      return;
    }

    const user: Service = {

      nroServicio:this.form.value.nroServicio,
      nombre:this.form.value.nombre,
      valorServicio:this.form.value.valorServicio,
      id:this.form.value.id

    }

    this.loading =true;
    if(this.id == undefined){
      setTimeout(()=>{
        this._serviceService.addservice(user).subscribe(() =>{
          this.loading =false;
          this.addcomplete('agregado');
        })
  
      },1500)
  
    }else{
        
        this._serviceService.editservice(this.id,user).subscribe(data => {
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
