import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsComponent } from './pages/films/films.component';
import { WatchedFilmsComponent } from './pages/watched-films/watched-films.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Films' },
  { path: 'Films', component: FilmsComponent },
  { path: 'WatchedFilms', component: WatchedFilmsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
