import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallevehiculoComponent } from './detallevehiculo.component';

describe('DetallevehiculoComponent', () => {
  let component: DetallevehiculoComponent;
  let fixture: ComponentFixture<DetallevehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallevehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallevehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
