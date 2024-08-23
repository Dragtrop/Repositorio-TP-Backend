import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Vehicles } from '../../interfaces/vehicles';
import {VehicleService} from "../../services/vehicle.service"
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddEditVehicleComponent } from '../add-edit-vehicle/add-edit-vehicle.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


const listVehicles: Vehicles[] = [];

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})

export class ListVehiclesComponent implements OnInit,AfterViewInit{


  displayedColumns: string[] = ['Patente', 'Marca', 'id','acciones'];
  dataSource: MatTableDataSource<Vehicles>;
  loading:boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor (public dialog: MatDialog,private _vehicleService: VehicleService,
    private _snackBar : MatSnackBar  ){
    this.dataSource = new MatTableDataSource(listVehicles);

  } 
  
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.ConsultarVehiculos();
  }
  

  addeditvehicle(id?:number){
    const dialogRef = this.dialog.open(AddEditVehicleComponent, {
      width: '550px',
      disableClose:true,
      data:{id:id}
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.ConsultarVehiculos()};
    })

  }

  ConsultarVehiculos(){
    this.loading =true;
    
    this._vehicleService.ConsultarVehiculos().subscribe(element => {
      this.loading = false;
      console.log(element)
      this.dataSource.data=element
    })
  }

  deletevehicle(id:number){
    this.loading = true;
    this._vehicleService.deletevehicle(id).subscribe(() =>{
      this.loading = false;
      this.ConsultarVehiculos();
      this.deletecomplete();
    }
    )
  }
  deletecomplete(){
    this._snackBar.open("Vehiculo eliminado con exito", "",{
      duration:2000
    });
  }



}
    


  


