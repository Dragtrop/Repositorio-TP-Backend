import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GaragesService } from 'src/app/services/garages.service';
import { Garages } from 'src/app/interfaces/garages.js';
import { AddEditGarageComponent } from '../add-edit-garage/add-edit-garage.component';

const listgarages: Garages[] = [];

@Component({
  selector: 'app-list-garage',
  templateUrl: './list-garage.component.html',
  styleUrls: ['./list-garage.component.scss']
})
export class ListGarageComponent implements OnInit,AfterViewInit{
  /*
      nroCochera:number,
    direccion:string,
    cantLugar:number,
    valorcoch:number,
    id: number,
  */

  displayedColumns: string[] = ['nroGarage', 'direccion', 'cantLugares','valorCocheraxH','idservicios','imagen','id','acciones'];
  dataSource: MatTableDataSource<Garages>;
  loading:boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor (public dialog: MatDialog,private _garagesService: GaragesService,
    private _snackBar : MatSnackBar  ){
    this.dataSource = new MatTableDataSource(listgarages);

  } 
  
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.ConsultarGarage();
  }
  

  addeditgarage(id?:number){
    const dialogRef = this.dialog.open(AddEditGarageComponent, {
      width: '550px',
      disableClose:true,
      data:{id:id}
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.ConsultarGarage()};
    })

  }

  ConsultarGarage(){
    this.loading =true;
    
    this._garagesService.ConsultarGarage().subscribe(element => {
      this.loading = false;
      console.log(element)
      this.dataSource.data=element
    })
  }

  deletegarage(id:number){
    this.loading = true;
    this._garagesService.deletegarage(id).subscribe(() =>{
      this.loading = false;
      this.ConsultarGarage();
      this.deletecomplete();
    }
    )
  }
  deletecomplete(){
    this._snackBar.open("Garage eliminado con exito", "",{
      duration:2000
    });
  }

}
