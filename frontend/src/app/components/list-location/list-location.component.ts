import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../interfaces/location';
import { LocationService } from "../../services/location.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddEditLocationComponent } from '../add-edit-location/add-edit-location.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const listLocations: Location[] = [];

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})

export class ListLocationsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'codigoPostal', 'id'];
  dataSource: MatTableDataSource<Location>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _locationService: LocationService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(listLocations);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.consultarLocations();
  }

  addeditLocation(id?: number) {
    const dialogRef = this.dialog.open(AddEditLocationComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarLocations();
      }
    });
  }

  consultarLocations() {
    this.loading = true;
    this._locationService.consultarLocations().subscribe(locations => {
      this.loading = false;
      this.dataSource.data = locations;
    });
  }

  deleteLocation(id: number) {
    this.loading = true;
    this._locationService.deleteLocation(id).subscribe(() => {
      this.loading = false;
      this.consultarLocations();
      this.deleteComplete();
    });
  }

  deleteComplete() {
    this._snackBar.open("Location eliminado con éxito", "", {
      duration: 2000
    });
  }
}
