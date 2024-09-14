import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from 'src/app/interfaces/services';
import { SevicesService } from 'src/app/services/sevices.service';
import { AddEditServicesComponent } from '../add-edit-services/add-edit-services.component';

const listService: Service[] = [];


@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit,AfterViewInit {


  displayedColumns: string[] = ['nroServicio', 'nombre', 'valorServicio','id','acciones'];
  dataSource: MatTableDataSource<Service>;
  loading:boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor (public dialog: MatDialog,private _servicesService: SevicesService,
    private _snackBar : MatSnackBar  ){
    this.dataSource = new MatTableDataSource(listService);

  } 
  
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.ConsultarService();
  }
  

  addeditservice(id?:number){
    const dialogRef = this.dialog.open(AddEditServicesComponent, {
      width: '550px',
      disableClose:true,
      data:{id:id}
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.ConsultarService()};
    })

  }

  ConsultarService(){
    this.loading =true;
    
    this._servicesService.ConsultarService().subscribe(element => {
      this.loading = false;
      console.log(element)
      this.dataSource.data=element
    })
  }

  deleteservice(id:number){
    this.loading = true;
    this._servicesService.deleteservice(id).subscribe(() =>{
      this.loading = false;
      this.ConsultarService();
      this.deletecomplete();
    }
    )
  }
  deletecomplete(){
    this._snackBar.open("Servicio eliminado con exito", "",{
      duration:2000
    });
  }

}
