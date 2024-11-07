import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicles } from 'src/app/interfaces/vehicles';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-edit-vehicle',
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.scss']
})
export class AddEditVehicleComponent {

  form: FormGroup;
  loading:boolean = false;
  operacion:string = "Agregar";
  id:number | undefined ;

  constructor(public dialogRef: MatDialogRef<AddEditVehicleComponent>,
    private fb:FormBuilder, private _vehicleService:VehicleService ,private _snackBar : MatSnackBar ,
     @Inject(MAT_DIALOG_DATA) public data:any){
      this.form = this.fb.group({
        patente:['',Validators.required, ],
        marca:['',Validators.required], 
        id: ['']

      })
      this.id=data.id;

    };


  ngOnInit(): void{
    this.isEdit(this.id)
  }

  isEdit(id:number | undefined){
    if(id !== undefined){
      this.operacion = "Editar ";
      this.getVehicle(id);
    }

  }
  Cancelar(){
    this.dialogRef.close(false);
  }

  getVehicle(id:number){
    this._vehicleService.getVehicle(id).subscribe(data =>{
      this.form.patchValue({
        patente:data.patente,
        marca:data.marca,
        id:data.id

      })  
    })
  }
  addEditPersona(){

    if(this.form.invalid){
      return;
    }

    const vehicle: Vehicles = {
      patente: this.form.value.patente,
      marca: this.form.value.marca,
      id: this.form.value.id,

    }

    this.loading =true;
    if(this.id == undefined){
      setTimeout(()=>{
        this._vehicleService.addvehicle(vehicle).subscribe(() =>{
          this.loading =false;
          this.addcomplete('agregado');
        })
  
      },1500)
  
    }else{
        
        this._vehicleService.editVehicle(this.id,vehicle).subscribe(data => {
        this.addcomplete('actualizado');
        
      })
    
    }
    this.loading =false;
    this.dialogRef.close(true);



  }
  addcomplete(operacion:string){
    this._snackBar.open(`Vehiculo ${operacion} con exito`, "",{
      duration:2000
    });
  }
}
