import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultado-pago',
  templateUrl: './resultado-pago.component.html',
  styleUrls: ['./resultado-pago.component.scss']
})
export class ResultadoPagoComponent implements OnInit {

  estado: 'success' | 'pending' | 'failure' | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const statuses = this.route.snapshot.queryParamMap.getAll('status');

    if (statuses.includes('success')) {
      this.estado = 'success';
    } else if (statuses.includes('pending')) {
      this.estado = 'pending';
    } else if (statuses.includes('failure')) {
      this.estado = 'failure';
    }
  }

  volverAlquileres(): void {
    this.router.navigate(['/principal/alquiler']);
  }
}