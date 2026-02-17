import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCocherasComponent } from './mis-cocheras.component';

describe('MisCocherasComponent', () => {
  let component: MisCocherasComponent;
  let fixture: ComponentFixture<MisCocherasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisCocherasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisCocherasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
