import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//COMPONENTS
import { ListUserComponent } from './components/list-user/list-user.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ListGarageComponent } from './components/list-garage/list-garage.component';
import { AddEditGarageComponent } from './components/add-edit-garage/add-edit-garage.component';
import { AddEditServicesComponent } from './components/add-edit-services/add-edit-services.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { AddEditVehicleComponent } from './components/add-edit-vehicle/add-edit-vehicle.component';
import { AddEditVehicleTypeComponent } from './components/add-edit-vehicleType/add-edit-vehicleType.component';
import { ListVehicleTypesComponent } from './components/list-vehicleType/list-vehicleType.component';
import { AddEditLocationComponent } from './components/add-edit-location/add-edit-location.component';
import { ListLocationsComponent } from './components/list-location/list-location.component';
import { DashboardComponent } from './principal/dashboard/dashboard.component';
import { ProfileComponent } from './principal/profile/profile.component';
import { AlquileresComponent } from './principal/alquileres/alquileres.component.js';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListVehiclesComponent,
    AddEditVehicleComponent,
    ListUserComponent,
    AddEditUserComponent,
    ListGarageComponent,
    AddEditGarageComponent,
    AddEditServicesComponent,
    ListServicesComponent,
    ListVehicleTypesComponent,
    AddEditVehicleTypeComponent,
    ListLocationsComponent,
    AddEditLocationComponent,
    DashboardComponent,
    ProfileComponent,
    AlquileresComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
