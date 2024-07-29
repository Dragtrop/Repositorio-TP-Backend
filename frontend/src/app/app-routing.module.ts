<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
=======
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
>>>>>>> 43085175e656e160ac0bccecf34c619bfd77413a
