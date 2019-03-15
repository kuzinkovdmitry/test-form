import {ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { UserModel } from '../../../models/user.model';
import {DataService} from '../../../services/data.service';
import {Subscription} from 'rxjs';
import {ApiService} from '../../../services/api.service';
import {HttpErrorModel} from '../../../services/HttpErrorModel';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataComponent implements OnInit, OnDestroy {
  @Input()
  public user: UserModel;
  private userSubscription: Subscription;
  public notFoundMessage: string;
  public showInfo = false;
  constructor(private dataService: DataService,
              private _API: ApiService,
              public cdr: ChangeDetectorRef) {
    this._getUser();
    this._checkErrors();
  }

  ngOnInit() {
  }
  private _getUser() {
      this.userSubscription = this.dataService.userSubject.subscribe(
        (data: UserModel) => {
          this.user = data;
          this.showInfo = true;
          if (data.name === null) {
            data.name = 'empty';
          }
          this.cdr.detectChanges();
        }
      );
  }
  private _checkErrors() {
    this._API.apiErrors.subscribe(
      (data: HttpErrorModel) => {
        if (data.value.status === 404) {
          this.showInfo = false;
          this.notFoundMessage = data.name;
          this.cdr.detectChanges();
        }
      }
    );
  }
  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }
}
