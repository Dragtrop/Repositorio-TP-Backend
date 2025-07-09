import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { ListVehicleTypesComponent } from './components/list-vehicleType/list-vehicleType.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListGarageComponent } from './components/list-garage/list-garage.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { ListLocationsComponent } from './components/list-location/list-location.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './principal/dashboard/dashboard.component';
import { ProfileComponent } from './principal/profile/profile.component';
import { AuthGuard } from './app/guards/auth.guard';
import { AuthenticatedGuard } from './app/guards/authenticated.guard';
import { AlquilerComponent } from './principal/alquileres/alquileres.component';
import { DetallevehiculoComponent } from './principal/detallevehiculo/detallevehiculo.component';
import { VehiculoComponent } from './principal/vehiculo/vehiculo.component';
import { DetalleAlquilerComponent } from './principal/detalle-alquiler/detalleAlquiler.component';

const routes: Routes = [

  {path:"vehiculos",component: ListVehiclesComponent },
  {path:"tipovehiculos",component: ListVehicleTypesComponent },
  {path:"localizaciones",component: ListLocationsComponent },  
  {path:"usuarios",component:ListUserComponent},
  {path:"garages",component:ListGarageComponent},
  {path:"servicios",component:ListServicesComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path: 'principal',
    loadComponent: () => import('./shared/component/layout/layout.component'),
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'detalle-alquiler/:id', component: DetalleAlquilerComponent },
      { path: 'alquiler', component: AlquilerComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'detalle-vehiculo', component: DetallevehiculoComponent,canActivate:[AuthGuard] },
      { path: 'vehiculo', component: VehiculoComponent },


    ]
  },
  {
    path: 'login',
    redirectTo: 'login'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

