import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componente
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { MovieSeriesComponent } from './movie-series/movie-series.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'prefix' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id/:type', component: DetailComponent },
  { path: 'all/:type', component: MovieSeriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
