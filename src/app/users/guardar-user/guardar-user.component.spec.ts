import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarUserComponent } from './guardar-user.component';

describe('GuardarUserComponent', () => {
  let component: GuardarUserComponent;
  let fixture: ComponentFixture<GuardarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
