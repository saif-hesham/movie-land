import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import Movie from 'src/app/Models/movie.model';

@Injectable({ providedIn: 'root' })
export class HttpDetailsService {
  constructor(private http: HttpClient) {}

  getMovieDetails(id: number) {
    return this.http
      .get<Movie>(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=d60118d51ed5279e39d0624c2f6994f4`
      )
      .pipe(
        map((details) => {
          return {
            ...details,
            imgUrl: 'https://image.tmdb.org/t/p/w500' + details.backdrop_path,
            genres: details.genres.map((genre) => genre.name),
            title: details.tagline
              ? details.title + ': ' + details.tagline
              : details.title,
          };
        })
      );
  }
}
