import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ListVehiclesComponent} from "./components/list-vehicles/list-vehicles.component"

const routes: Routes = [
  {path:"",component:ListVehiclesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
