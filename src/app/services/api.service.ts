import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private URL = `https://api.github.com/users`;
  public apiErrors = new Subject();
  constructor(private http: HttpClient) {}

  public getUserInfo(name): Observable<any> {
    return this.http.get(`${this.URL}/${name}`)
      .pipe(
        catchError(err => throwError(err)),
        map(data => data),
      );
  }
  public sendHttpErrors(value: HttpErrorResponse, name: string) {
    this.apiErrors.next({value, name});
  }
}
