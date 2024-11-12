import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlquilerComponent } from './alquileres.component';

describe('AlquileresComponent', () => {
  let component: AlquilerComponent;
  let fixture: ComponentFixture<AlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});