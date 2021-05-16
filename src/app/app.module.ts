import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ASideComponent } from './layouts/a-side/a-side.component';
import { FilmsComponent } from './pages/films/films.component';
import { FilmPageComponent } from './pages/film-page/film-page.component';
import { WatchedFilmsComponent } from './pages/watched-films/watched-films.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [AppComponent, ASideComponent, FilmsComponent, WatchedFilmsComponent, FilmPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, ModalModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
