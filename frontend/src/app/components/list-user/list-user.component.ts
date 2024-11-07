import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/user.js';
import { UserService } from 'src/app/services/user.service';

const listUsers: User[] = [];


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})


export class ListUserComponent implements OnInit,AfterViewInit{


  displayedColumns: string[] = ['nroCliente', 'nombre', 'apellido','telefono','mail','Rol','id','acciones'];
  dataSource: MatTableDataSource<User>;
  loading:boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor (public dialog: MatDialog,private _userService: UserService,
    private _snackBar : MatSnackBar  ){
    this.dataSource = new MatTableDataSource(listUsers);

  } 
  
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.ConsultarUsuarios();
  }
  

  addedituser(id?:number){
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '550px',
      disableClose:true,
      data:{id:id}
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.ConsultarUsuarios()};
    })

  }

  ConsultarUsuarios(){
    this.loading =true;
    
    this._userService.ConsultarUsuarios().subscribe(element => {
      this.loading = false;
      console.log(element)
      this.dataSource.data=element
    })
  }

  deleteuser(id:number){
    this.loading = true;
    this._userService.deleteuser(id).subscribe(() =>{
      this.loading = false;
      this.ConsultarUsuarios();
      this.deletecomplete();
    }
    )
  }
  deletecomplete(){
    this._snackBar.open("Usuario eliminado con exito", "",{
      duration:2000
    });
  }



}
    


  


