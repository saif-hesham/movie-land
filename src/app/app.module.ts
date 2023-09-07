import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { MovieCardComponent } from './components/catalog/movie-card/movie-card.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    NotFoundComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
