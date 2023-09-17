import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import Movie from 'src/app/Types/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpDetailsService {
  constructor(private http: HttpClient) {}

  getMovieDetails(id: number) {
    return this.http
      .get<Movie>(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${environment.apiKey}`
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
