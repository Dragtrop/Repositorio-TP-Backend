import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  /** Controla si el sidebar está desplegado en móviles */
  @Input() visible = false;
  /** Emite evento para cerrar sidebar (al clicar la X) */
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
