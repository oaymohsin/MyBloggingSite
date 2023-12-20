import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAndTelecomComponent } from './tech-and-telecom.component';

describe('TechAndTelecomComponent', () => {
  let component: TechAndTelecomComponent;
  let fixture: ComponentFixture<TechAndTelecomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechAndTelecomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechAndTelecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
