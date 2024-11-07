import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVehicleTypeComponent } from './add-edit-vehicleType.component';

describe('AddEditVehicleComponent', () => {
  let component: AddEditVehicleTypeComponent;
  let fixture: ComponentFixture<AddEditVehicleTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditVehicleTypeComponent]
    });
    fixture = TestBed.createComponent(AddEditVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
