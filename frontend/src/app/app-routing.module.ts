import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { ListVehicleTypesComponent } from './components/list-vehicleType/list-vehicleType.component';
import { ListLocationsComponent } from './components/list-location/list-location.component';
import{ListVehiclesComponent} from "./components/list-vehicles/list-vehicles.component"
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListGarageComponent } from './components/list-garage/list-garage.component';
import { ListServicesComponent } from './components/list-services/list-services.component';

const routes: Routes = [
  { path: 'vehicles', component: ListVehiclesComponent },
  { path: 'vehicleTypes', component: ListVehicleTypesComponent },
  { path: 'locations', component: ListLocationsComponent }
  
  {path:"",component:ListVehiclesComponent},
  {path:"",component:ListUserComponent},
  {path:"",component:ListGarageComponent},
  {path:"",component:ListServicesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

