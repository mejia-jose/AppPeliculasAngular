import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSeriesComponent } from './movie-series.component';

describe('MovieSeriesComponent', () => {
  let component: MovieSeriesComponent;
  let fixture: ComponentFixture<MovieSeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSeriesComponent]
    });
    fixture = TestBed.createComponent(MovieSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
