import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseProductDetailsComponent } from './merchandise-product-details.component';

describe('MerchandiseProductDetailsComponent', () => {
  let component: MerchandiseProductDetailsComponent;
  let fixture: ComponentFixture<MerchandiseProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchandiseProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
