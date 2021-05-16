import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Films, FilmsApiResponse } from '../../shared/interfaces/film-model';
import { FormControl } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent implements OnInit {
  searchControl = new FormControl('');
  films$: Films[];
  currentPage: number;
  totalPages: number;
  currentFilm: Films;
  searchStatus = false;
  modalRef: BsModalRef;
  constructor(public filmApi: ApiService, private modalService: BsModalService) {}

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
  getFilmDetail(fimID: number): void {
    this.currentFilm = this.films$[fimID];
  }
  changePage(status: boolean): void {
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
        this.films$ = res.results;
        this.totalPages = res.total_pages;
        this.currentPage = res.page;
      });
  }

  searchFilm(filmName, page = 1): void {
    this.filmApi.searchFilm(filmName, page).subscribe((res) => {
      this.films$ = res.results;
      this.totalPages = res.total_pages;
    });
  }

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
