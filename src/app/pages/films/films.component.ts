import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Film, FilmsApiResponse } from '../../shared/interfaces/film-model';
import { FormControl } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FilmsService } from '../../shared/services/films.service';
import { log } from 'util';
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent implements OnInit {
  searchControl = new FormControl('');
  films$: Film[];
  currentPage: number;
  currentFilm: Film;
  currentFilmIndex: number;
  totalPages: number;
  searchStatus = false;

  modalRef: BsModalRef;
  constructor(public filmsService: FilmsService, public filmApi: ApiService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.getPopularFilms();
    this.searchControl.valueChanges.pipe(debounceTime(1500)).subscribe((val) => {
      this.searchFilm(val);
      this.currentPage = 1;
      this.searchStatus = true;
    });
  }

  changePageControl(action: string): void {
    action === 'next' && this.currentPage !== this.totalPages ? this.changePage(true) : this.changePage(false);
  }
  private changePage(status: boolean): void {
    status && this.currentPage < this.totalPages
      ? this.currentPage++
      : this.currentPage > 1
      ? this.currentPage--
      : (this.currentPage = 1);
    !this.searchStatus
      ? this.getPopularFilms(this.currentPage)
      : this.searchFilm(this.searchControl.value, this.currentPage);
    window.scroll(0, 0);
  }

  private getPopularFilms(page: number = 1): void {
    this.filmApi
      .getPopularFilms(page)
      .pipe(take(1))
      .subscribe((res: FilmsApiResponse) => {
        this.films$ = res.results.map((film: Film): Film => {
          return { ...film, isWatched: this.filmsService.checkFilmIsWatched(film) };
        });
        this.totalPages = res.total_pages;
        this.currentPage = res.page;
      });
  }
  private searchFilm(filmName, page = 1): void {
    this.filmApi.searchFilm(filmName, page).subscribe((res: FilmsApiResponse) => {
      this.films$ = res.results.map((film: Film): Film => {
        return { ...film, isWatched: this.filmsService.checkFilmIsWatched(film) };
      });
      this.totalPages = res.total_pages;
    });
  }

  getFilmDetail(filmID: number): void {
    this.currentFilm = this.films$[filmID];
    this.currentFilmIndex = filmID;
  }

  watchedFilmsControl(action: string): void {
    action === 'add'
      ? (this.films$[this.currentFilmIndex].isWatched = true)
      : (this.films$[this.currentFilmIndex].isWatched = false);
    this.filmsService.changeWatchedList(this.currentFilm, action);
  }

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
