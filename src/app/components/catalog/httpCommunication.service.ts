import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Movie from 'src/app/Models/movie.model';

@Injectable({ providedIn: 'root' })
export class HttpCommincationService {
  constructor(private http: HttpClient) {}
  filter = new Subject<string>();
  filterSub: Subscription;
  getMovies(category: string) {
    return this.http
      .get<{ [key: string]: Movie[] }>(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&api_key=d60118d51ed5279e39d0624c2f6994f4`
      )
      .pipe(
        map((res) => {
          return res.results.map((movie) => {
            return {
              ...movie,
              imgUrl: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
              overview:
                movie.overview.length > 130
                  ? movie.overview.slice(0, 130) + '...'
                  : movie.overview,
            };
          });
        })
      );
  }
}
