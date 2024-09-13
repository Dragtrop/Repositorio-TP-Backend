import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { ListVehicleTypesComponent } from './components/list-vehicleType/list-vehicleType.component';
import { ListLocationsComponent } from './components/list-location/list-location.component';

const routes: Routes = [
  { path: 'vehicles', component: ListVehiclesComponent },
  { path: 'vehicleTypes', component: ListVehicleTypesComponent },
  { path: 'locations', component: ListLocationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

