import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './components/auth/auth.component';
import { isUserLoggedInGuard } from './components/auth/auth.guard';
import { registerGuard } from './components/auth/register.guard';
import { homeGuard } from './components/auth/home.guard';

const appRoutes: Routes = [
  { path: '', component: CatalogComponent, canActivate: [homeGuard] },
  { path: 'auth', component: AuthComponent, canActivate: [registerGuard] },
  {
    path: 'movies',
    component: CatalogComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    canActivate: [isUserLoggedInGuard],
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: 'notfound' },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
