import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServicesComponent } from './add-edit-services.component';

describe('AddEditServicesComponent', () => {
  let component: AddEditServicesComponent;
  let fixture: ComponentFixture<AddEditServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditServicesComponent]
    });
    fixture = TestBed.createComponent(AddEditServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});