import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarCursoComponent } from './guardar-curso.component';

describe('GuardarCursoComponent', () => {
  let component: GuardarCursoComponent;
  let fixture: ComponentFixture<GuardarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
