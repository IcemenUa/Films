import { Injectable } from '@angular/core';
import { Film } from '../interfaces/film-model';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  constructor() {}

  checkFilmIsWatched(film: Film): boolean {
    if (localStorage.getItem('WatchedFilms')) {
      const watchedFilms = JSON.parse(localStorage.getItem('WatchedFilms'));
      return watchedFilms.some((watchedFilm) => watchedFilm.id === film.id);
    } else {
      return false;
    }
  }

  changeWatchedList(film: Film, action: string): void {
    let watchedFilms: Array<Film> = [];
    if (action === 'add') {
      if (localStorage.getItem('WatchedFilms')) {
        watchedFilms = JSON.parse(localStorage.getItem('WatchedFilms'));
      }
      watchedFilms.push(film);
      localStorage.setItem('WatchedFilms', JSON.stringify(watchedFilms));
    } else {
      watchedFilms = JSON.parse(localStorage.getItem('WatchedFilms'));
      const indexForDelete = watchedFilms.findIndex((watchedFilm) => watchedFilm.id === film.id);
      watchedFilms.splice(indexForDelete, 1);
      localStorage.setItem('WatchedFilms', JSON.stringify(watchedFilms));
    }
  }
}
