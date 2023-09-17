import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpCommincationService } from '../../services/httpCommunication.service';

import Movie from 'src/app/Types/movie.model';

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
    this.checkCurCategory();
    this.populateMovies(null);
  }
  populateMovies(movieCateogory: string | null) {
    this.httpCommincator.getMovies(movieCateogory).subscribe(
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

  checkCurCategory() {
    this.httpCommincator.filter.subscribe((val) => {
      this.populateMovies(val);
    });
  }
}
