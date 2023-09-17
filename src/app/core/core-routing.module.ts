import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isUserLoggedInGuard } from '../auth/guards/auth.guard';
import { CatalogComponent } from './catalog/catalog.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: ':id',
    component: MovieDetailsComponent,
    canActivate: [isUserLoggedInGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
