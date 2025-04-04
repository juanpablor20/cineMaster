import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMovieComponent } from './hero-movie.component';

describe('HeroMovieComponent', () => {
  let component: HeroMovieComponent;
  let fixture: ComponentFixture<HeroMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
