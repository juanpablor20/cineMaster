import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningDetailComponent } from './screening-detail.component';

describe('ScreeningDetailComponent', () => {
  let component: ScreeningDetailComponent;
  let fixture: ComponentFixture<ScreeningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreeningDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreeningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
