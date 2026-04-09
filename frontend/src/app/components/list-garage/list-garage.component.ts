import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GaragesService } from 'src/app/services/garages.service';
import { Garages } from 'src/app/interfaces/garages.js';
import { AddEditGarageComponent } from '../add-edit-garage/add-edit-garage.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-garage',
  templateUrl: './list-garage.component.html',
  styleUrls: ['./list-garage.component.scss']
})
export class ListGarageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'nroGarage',
    'direccion',
    'cantLugares',
    'valorCocheraxH',
    'idservicios',
    'imagen',
    'id',
    'acciones'
  ];

  dataSource: MatTableDataSource<Garages> = new MatTableDataSource<Garages>([]);
  loading: boolean = false;

  idDueno: number = 0;        // ID del dueño logueado
  modoMisCocheras: boolean = false;  // Detecta si la ruta es /principal/mis-cocheras

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private garagesService: GaragesService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // 1) Ver si estamos en /principal/mis-cocheras
    this.modoMisCocheras = this.activatedRoute.snapshot.routeConfig?.path === 'mis-cocheras';

    // 2) Tomar el ID del usuario logueado
    const user = this.authService.getCurrentUser();
    if (user?.id) {
      this.idDueno = user.id;
    }

    // 3) Ejecutar la consulta correcta
    this.cargarCocheras();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarCocheras(): void {
    this.loading = true;

    // Si es el dueño → trae solo sus cocheras
    if (this.modoMisCocheras && this.idDueno > 0) {
      this.garagesService.ConsultarGaragePorDueno().subscribe(
        garages => {
          this.loading = false;
          this.dataSource.data = garages;
        },
        () => this.loading = false
      );
      return;
    }

    
    this.garagesService.ConsultarGarage().subscribe(response => {
  this.dataSource.data = response.data;
});
  }

  addeditgarage(id?: number) {
    const dialogRef = this.dialog.open(AddEditGarageComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarCocheras();
    });
  }

  deletegarage(id: number) {
    this.loading = true;

    this.garagesService.deletegarage(id).subscribe(() => {
      this.loading = false;
      this.cargarCocheras();
      this.snackBar.open("Garage eliminado con éxito", "", { duration: 2000 });
    });
  }
}
