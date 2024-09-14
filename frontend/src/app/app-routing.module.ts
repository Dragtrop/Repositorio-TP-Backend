import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { ListVehicleTypesComponent } from './components/list-vehicleType/list-vehicleType.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListGarageComponent } from './components/list-garage/list-garage.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { ListLocationsComponent } from './components/list-location/list-location.component';

const routes: Routes = [
  {path:"",component: ListVehiclesComponent },
  {path:"",component: ListVehicleTypesComponent },
  {path:"",component: ListLocationsComponent },  
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

