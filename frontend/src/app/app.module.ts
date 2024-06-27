import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { AddEditVehicleComponent } from './components/add-edit-vehicle/add-edit-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListVehiclesComponent,
    AddEditVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
