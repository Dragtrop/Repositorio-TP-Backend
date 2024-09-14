import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocationsComponent } from './list-location.component';

describe('ListVehiclesComponent', () => {
  let component: ListLocationsComponent;
  let fixture: ComponentFixture<ListLocationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLocationsComponent]
    });
    fixture = TestBed.createComponent(ListLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
