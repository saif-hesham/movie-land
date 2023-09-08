import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpCommincationService } from './httpCommunication.service';

import Movie from 'src/app/Models/movie.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  constructor(private httpCommincator: HttpCommincationService) {}
  movies: Movie[] = [];
  error: null | string = null;
  loading = true;
  ngOnInit() {
    this.httpCommincator.getMovies().subscribe(
      (resData) => {
        this.movies = resData;
        this.loading = false;
      },
      (err) => {
        this.error =
          'There was an error fetching the movies, please try again later.';
      }
    );
    this.loading = false;
  }
}
