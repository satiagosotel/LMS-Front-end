import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarLeccionComponent } from './guardar-leccion.component';

describe('GuardarLeccionComponent', () => {
  let component: GuardarLeccionComponent;
  let fixture: ComponentFixture<GuardarLeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarLeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
