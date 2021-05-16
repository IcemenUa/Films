import { Component, OnInit, TemplateRef } from '@angular/core';
import { Film } from '../../shared/interfaces/film-model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilmsService } from '../../shared/services/films.service';

@Component({
  selector: 'app-watched-films',
  templateUrl: './watched-films.component.html',
  styleUrls: ['./watched-films.component.scss'],
})
export class WatchedFilmsComponent implements OnInit {
  watchedFilms: Array<Film> = [];
  currentFilm: Film;
  modalRef: BsModalRef;

  constructor(public filmsService: FilmsService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.getWatchedFilms();
  }

  getWatchedFilms(): void {
    this.watchedFilms = JSON.parse(localStorage.getItem('WatchedFilms'));
    console.log(this.watchedFilms);
  }

  getFilmDetail(fimID: number): void {
    this.currentFilm = this.watchedFilms[fimID];
  }
  deleteFromWatched(): void {
    this.filmsService.changeWatchedList(this.currentFilm, 'delete');
    this.watchedFilms = JSON.parse(localStorage.getItem('WatchedFilms'));
  }
  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
