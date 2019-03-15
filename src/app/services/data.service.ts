import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public userSubject = new Subject();

  constructor() { }
  public sendUser(user: UserModel) {
    this.userSubject.next(user);
  }
}
