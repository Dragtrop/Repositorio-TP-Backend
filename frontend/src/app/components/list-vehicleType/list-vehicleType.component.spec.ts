import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListVehicleTypesComponent } from './list-vehicleType.component';

describe('ListVehicleTypesComponent', () => {
  let component: ListVehicleTypesComponent;
  let fixture: ComponentFixture<ListVehicleTypesComponent>; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVehicleTypesComponent] 
    });
    fixture = TestBed.createComponent(ListVehicleTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
