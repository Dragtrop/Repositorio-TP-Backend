import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VehicleType } from '../../interfaces/vehicleType';
import { VehicleTypeService } from "../../services/vehicleType.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddEditVehicleTypeComponent } from '../add-edit-vehicleType/add-edit-vehicleType.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const listVehicleTypes: VehicleType[] = [];

@Component({
  selector: 'app-list-vehicle-types',
  templateUrl: './list-vehicleType.component.html',
  styleUrls: ['./list-vehicleType.component.scss']
})
export class ListVehicleTypesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'codigo', 'id', 'acciones'];
  dataSource: MatTableDataSource<VehicleType>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _vehicleTypeService: VehicleTypeService,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(listVehicleTypes);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.ConsultarVehicleTypes();
  }

  addEditVehicleType(id?: number) {
    const dialogRef = this.dialog.open(AddEditVehicleTypeComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ConsultarVehicleTypes();
      }
    });
  }

  ConsultarVehicleTypes() {
    this.loading = true;
    this._vehicleTypeService.ConsultarVehicleTypes().subscribe(element => {
      this.loading = false;
      console.log(element);
      this.dataSource.data = element;
    });
  }

  deleteVehicleType(id: number) {
    this.loading = true;
    this._vehicleTypeService.deleteVehicleType(id).subscribe(() => {
      this.loading = false;
      this.ConsultarVehicleTypes();
      this.deleteComplete();
    });
  }

  deleteComplete() {
    this._snackBar.open("Tipo de vehículo eliminado con éxito", "", {
      duration: 2000
    });
  }
}

    


  


