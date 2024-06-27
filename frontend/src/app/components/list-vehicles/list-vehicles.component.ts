import { Component } from '@angular/core';
import { vehicle } from 'src/app/interfaces/vehicle.js';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})
export class ListVehiclesComponent {

  listVehicles: vehicle[] =[
    {patente:"AR-455-PF",marca:"Toyota"},
    {patente:"AE-473-LF",marca:"Ford"}

  ]

}
