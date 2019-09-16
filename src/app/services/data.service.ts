import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ProjectModel} from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public userSubject = new Subject();
  public favoritesProjects$: BehaviorSubject<ProjectModel[]> = new BehaviorSubject([]);

  get projects(): ProjectModel[] {
    const projects = JSON.parse(localStorage.getItem('projects'));
    return projects ? projects : [];
  }

  constructor() {
    this.favoritesProjects$.next(this.projects);
  }

  checkRepeat(selectedProject: ProjectModel): boolean {
    return this.favoritesProjects$.getValue().some(item => item.id === selectedProject.id);
  }

  public sendUser(user: ProjectModel) {
    this.userSubject.next(user);
  }


  public addToF(project: ProjectModel) {
    if (!this.checkRepeat(project)) {
      this.saveFavorite(project);
      const prev = this.favoritesProjects$.getValue();
      this.favoritesProjects$.next(prev.concat(project));
    }
  }

  public saveFavorite(project: ProjectModel) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const projectList = projects ? projects.concat(project) : [project];
    localStorage.setItem('projects', JSON.stringify(projectList));
  }
}
