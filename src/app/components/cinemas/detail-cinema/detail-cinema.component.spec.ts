import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCinemaComponent } from './detail-cinema.component';

describe('DetailCinemaComponent', () => {
  let component: DetailCinemaComponent;
  let fixture: ComponentFixture<DetailCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCinemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
