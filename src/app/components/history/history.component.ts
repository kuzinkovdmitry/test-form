import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import {UserModel} from '../../models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  @Input()
  user: UserModel;
  public UserList: UserModel[] = [];
  private userSubscription: Subscription;
  constructor(private dataService: DataService) {
    this._getListUser();
  }

  ngOnInit() {
  }
  private _getListUser() {
    this.userSubscription = this.dataService.userSubject.subscribe(
      (data: UserModel) => {
        this.UserList.push(data);
      }
    );
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
