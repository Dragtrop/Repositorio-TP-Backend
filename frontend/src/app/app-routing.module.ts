import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { ListVehicleTypesComponent } from './components/list-vehicleType/list-vehicleType.component';
import { ListUserComponent } from './principal/usuarios/list-user/list-user.component';
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
import { GarageFormComponent } from './principal/misCocherasComponent/garage-form/garage-form.component';
import { MisCocherasComponent } from './principal/mis-cocheras/mis-cocheras.component';
import { EditUserComponent } from './principal/usuarios/edit-user/edit-user.component';
import { EditarGarageComponent } from './principal/editar-garage/editar-garage.component';
import { ResultadoPagoComponent } from './components/pagos/resultado-pago/resultado-pago.component';

const routes: Routes = [

  { path: "login", component: LoginComponent, canActivate: [AuthenticatedGuard] },
  { path: "register", component: RegisterComponent, canActivate: [AuthenticatedGuard] },

  { 
    path: 'principal',
    loadComponent: () =>
      import('./shared/component/layout/layout.component')
        .then(m => m.LayoutComponent),
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',component: DashboardComponent },
      { path: 'alquiler', component: AlquilerComponent },
      { path: 'detalle-alquiler/:id', component: DetalleAlquilerComponent },
      { path: 'detalle-vehiculo', component: DetallevehiculoComponent },
      { path: 'vehiculo', component: VehiculoComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'garage/new', component: GarageFormComponent },
      { path: 'mis-cocheras', component: MisCocherasComponent },
      { path: 'editar-garage/:id', component: EditarGarageComponent },
      { path: 'usuarios', component: ListUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'pagos/resultado', component: ResultadoPagoComponent },
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}