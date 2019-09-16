import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private URL = `https://api.github.com/search/repositories?q=`;
  constructor(private http: HttpClient) {}

  public getUserInfo(name): Observable<any> {
    return this.http.get(`${this.URL}${name}`)
      .pipe(
        map((data: any) => data.items)
      );
  }
}
