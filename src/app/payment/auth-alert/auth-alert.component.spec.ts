import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAlertComponent } from './auth-alert.component';

describe('AuthAlertComponent', () => {
  let component: AuthAlertComponent;
  let fixture: ComponentFixture<AuthAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
