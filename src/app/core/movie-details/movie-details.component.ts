import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDetailsService } from '../../services/httpDetailsService.service';
import Movie from 'src/app/Types/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie = {} as Movie;
  error: null | string = null;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private httpCommunicator: HttpDetailsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMovieById();
  }
  onNavigate() {
    this.router.navigate(['movies']);
  }

  getMovieById() {
    const { id } = this.route.snapshot.params;
    this.httpCommunicator.getMovieDetails(id).subscribe(
      (data) => {
        this.movie = data;
      },
      (err) => {
        this.error =
          'There was an error fetching this movie, please try again later.';
      },
      () => {
        this.loading = false;
      }
    );
  }
}
