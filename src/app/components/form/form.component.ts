import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import {catchError, debounceTime, mergeMap} from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  private _UNSUB = new Subject();
  public findControl = new FormControl();
  @ViewChild('elementInp') inp: ElementRef;
  name: string;
  user: UserModel = null;
  error = false;
  response: Observable<any>;

  constructor(
    private _API: ApiService,
    private dataService: DataService
  ) {}

  ngOnInit() {
  this.response = fromEvent(this.inp.nativeElement, 'input')
      .pipe(
        debounceTime(600),
        mergeMap ((e: any ) => {
          return this._API.getUserInfo(e.target.value).pipe(
            catchError((err: HttpErrorResponse) => {
              this._API.sendHttpErrors(err, e.target.value);
              return null;
            } )

          );
        }
     ));
  this.response.subscribe((data) => {
    this.user = data;
    this.error = false;
    this.dataService.sendUser(data);
  });

  }
  ngOnDestroy(): void {

  }
}
