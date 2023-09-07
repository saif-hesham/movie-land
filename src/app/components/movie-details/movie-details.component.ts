import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDetailsService } from './httpDetailsService.service';
import Movie from 'src/app/Models/movie.model';

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
    const { id } = this.route.snapshot.params;
    this.httpCommunicator.getMovieDetails(id).subscribe(
      (data) => {
        this.movie = data;
        console.log(data);
      },
      (err) => {
        this.error =
          'There was an error fetching this movie, please try again later.';
      }
    );
    this.loading = false;
  }
  onNavigate() {
    this.router.navigate(['movies']);
  }
}
