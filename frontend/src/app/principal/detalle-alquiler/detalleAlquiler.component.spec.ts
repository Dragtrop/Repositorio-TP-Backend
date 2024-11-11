import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlquilerComponent } from './detalleAlquiler.component';

describe('DetalleAlquilerComponent', () => {
  let component: DetalleAlquilerComponent;
  let fixture: ComponentFixture<DetalleAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAlquilerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
