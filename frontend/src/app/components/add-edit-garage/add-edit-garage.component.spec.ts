import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGarageComponent } from './add-edit-garage.component';

describe('AddEditGarageComponent', () => {
  let component: AddEditGarageComponent;
  let fixture: ComponentFixture<AddEditGarageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditGarageComponent]
    });
    fixture = TestBed.createComponent(AddEditGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
