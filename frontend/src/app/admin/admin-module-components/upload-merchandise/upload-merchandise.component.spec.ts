import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMerchandiseComponent } from './upload-merchandise.component';

describe('UploadMerchandiseComponent', () => {
  let component: UploadMerchandiseComponent;
  let fixture: ComponentFixture<UploadMerchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMerchandiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
