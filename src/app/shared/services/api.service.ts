import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FilmsApiResponse } from '../interfaces/film-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPopularFilms(page: number): Observable<FilmsApiResponse> {
    return this.http.get<FilmsApiResponse>(
      `${environment.apiUrl}movie/top_rated?${environment.apiKey}&region=ua&page=${page}`
    );
  }

  searchFilm(filmName: string, page: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}search/movie?${environment.apiKey}&query=${filmName}&page=${page}`);
  }
}
