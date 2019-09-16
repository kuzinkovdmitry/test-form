import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ProjectModel} from '../../models/project.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  public favorites$: Observable<ProjectModel[]>;

  constructor(private dataService: DataService) {
    this.favorites$ = this.dataService.favoritesProjects$;
  }
}
