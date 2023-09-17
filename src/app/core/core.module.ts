import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { MovieCardComponent } from './catalog/movie-card/movie-card.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CoreRoutingModule } from './core-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CatalogComponent, MovieCardComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    MatProgressSpinnerModule,
  ],
  exports: [CatalogComponent, MovieCardComponent, MovieDetailsComponent],
})
export class CoreModule {}
