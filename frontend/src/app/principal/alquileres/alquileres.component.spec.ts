<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlquileresComponent } from './alquileres.component';

describe('AlquileresComponent', () => {
  let component: AlquileresComponent;
  let fixture: ComponentFixture<AlquileresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquileresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlquileresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquileresComponent } from './alquileres.component';

describe('AlquileresComponent', () => {
  let component: AlquileresComponent;
  let fixture: ComponentFixture<AlquileresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquileresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlquileresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> 66a25c48cb71c9c2c3e6762375b40b5870af4796
