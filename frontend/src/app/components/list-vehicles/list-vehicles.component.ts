<<<<<<< HEAD
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
=======
import { Component, OnInit } from '@angular/core';
import { Vehicles } from '../../interfaces/vehicles';
import {VehicleService} from "../../services/vehicle.service"

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})


export class ListVehiclesComponent implements OnInit{

  listVehicles: Vehicles[] = [];

  constructor (private servicioVehicle:VehicleService){ }

  ngOnInit(): void {
    this.getListVehicles();
  }

  getListVehicles(){
    this.servicioVehicle.ConsultarVehiculos().subscribe((data)=>{
      console.log(data)
      this.listVehicles = data;
    })
  }    
    

  }
    


  


>>>>>>> 43085175e656e160ac0bccecf34c619bfd77413a
