import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGarageComponent } from './editar-garage.component';

describe('EditarGarageComponent', () => {
  let component: EditarGarageComponent;
  let fixture: ComponentFixture<EditarGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarGarageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
