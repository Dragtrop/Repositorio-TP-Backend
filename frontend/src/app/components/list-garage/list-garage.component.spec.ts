import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGarageComponent } from './list-garage.component';

describe('ListGarageComponent', () => {
  let component: ListGarageComponent;
  let fixture: ComponentFixture<ListGarageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListGarageComponent]
    });
    fixture = TestBed.createComponent(ListGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
