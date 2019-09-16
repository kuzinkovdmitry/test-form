import {ChangeDetectionStrategy, Component, Input, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ProjectModel} from '../../../models/project.model';
import {DataService} from '../../../services/data.service';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsListComponent implements OnDestroy {
  public projects$: Subject<ProjectModel[]> = new Subject<ProjectModel[]>();
  public allProjects: ProjectModel[];
  public showInfo = false;
  private unsubAll = new Subject();

  constructor(private dataService: DataService,
              private cdRef: ChangeDetectorRef) {
    this._getUser();
  }

  @Input() set currentLang(data: string) {
    if (data) {
      if (data === 'All') {
        this.projects$.next(this.allProjects);
      } else {
        const filteredProjects = this.allProjects.filter(item => item.language === data);
        this.projects$.next(filteredProjects);
      }
      this.cdRef.detectChanges();
    }
  }

  private _getUser() {
    this.dataService.userSubject
      .pipe(
        takeUntil(this.unsubAll),
        tap((projects: ProjectModel[]) => this.projects$.next(projects))
      )
      .subscribe(
        (data: ProjectModel[]) => {
          this.allProjects = data;
          this.showInfo = true;
          this.cdRef.detectChanges();
        }
      );
  }

  addToFavorite(project: ProjectModel) {
    this.dataService.addToF(project);
  }

  ngOnDestroy() {
    this.unsubAll.next();
    this.unsubAll.complete();
  }
}
