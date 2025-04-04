import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCinemasComponent } from './hero-cinemas.component';

describe('HeroCinemasComponent', () => {
  let component: HeroCinemasComponent;
  let fixture: ComponentFixture<HeroCinemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCinemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
