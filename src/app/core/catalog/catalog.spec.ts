import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { HttpCommincationService } from '../../services/httpCommunication.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import Movie from 'src/app/Types/movie.model';
import { CoreModule } from '../core.module';
import { ActivatedRoute } from '@angular/router';

describe('Component: Catalog', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  const fakeMovieData: Movie[] = [
    {
      original_title: 'Fake Movie 1',
      overview: 'Such a fake movie',
      release_date: '1994-09-23',
      vote_count: '23322',
      vote_average: '7.7',
      tagline: 'fake tagline',
      id: 2,
      imgUrl: 'www.image.com',
      backdrop_path: 'sngtri',
      genres: ['comedy', 'drama'],
      title: 'The original fake title',
      homepage: 'www.homepage.com',
      budget: 12341234,
    },
    {
      original_title: 'Fake Movie 2',
      overview: 'Such a fake movie',
      release_date: '1994-09-23',
      vote_count: '23322',
      vote_average: '7.7',
      tagline: 'fake tagline',
      id: 2,
      imgUrl: 'www.image.com',
      backdrop_path: 'sngtri',
      genres: ['comedy', 'drama'],
      title: 'The original fake title',
      homepage: 'www.homepage.com',
      budget: 12341234,
    },
  ];
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      providers: [
        HttpHandler,
        HttpClient,
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
      imports: [CoreModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
        const httpService = TestBed.inject(HttpCommincationService);
        spyOn(httpService, 'getMovies').and.returnValue(of(fakeMovieData));
      });
  }));

  it('Should create the Catalog App', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize movies array correctly', () => {
    component.ngOnInit();
    expect(component.movies.length).toEqual(2);
  });

  it('Should make sure movies are created on the dom', () => {
    fixture.detectChanges();
    const movieElements = fixture.debugElement.queryAll(
      By.css('app-movie-card')
    );
    expect(movieElements.length).toEqual(2);
  });
});
