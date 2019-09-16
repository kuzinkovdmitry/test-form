import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {catchError, debounceTime, mergeMap} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {ProjectModel} from '../../models/project.model';
import {DataService} from '../../services/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  public languages: string[] = ['All'];
  user: ProjectModel = null;
  error = false;
  response: Observable<any>;
  langForm!: FormGroup;
  @Output() selectedLang: EventEmitter<string> = new EventEmitter();
  @ViewChild('elementInp') inp: ElementRef;

  constructor(private cdRef: ChangeDetectorRef,
              private _API: ApiService,
              private dataService: DataService
  ) {
    this.langForm = new FormGroup({
      language: new FormControl('All')
    });
    this.langForm.valueChanges.subscribe(selectedLang => this.selectedLang.next(selectedLang.language));
  }

  ngOnInit() {
    this.response = fromEvent(this.inp.nativeElement, 'input')
      .pipe(
        debounceTime(1000),
        mergeMap((e: any) => {
            this.form.language.setValue('All');
            return this._API.getUserInfo(e.target.value);
          }
        ));
    this.response.subscribe((data) => {
      this.languages = ['All'];
      let languagesList = data.reduce((acc, item) => {
        return acc.concat(item.language);
      }, []).filter(item => item);
      languagesList = Array.from(new Set(languagesList));
      this.languages = this.languages.concat(languagesList);
      this.user = data;
      this.error = false;
      this.dataService.sendUser(data);
      this.cdRef.detectChanges();
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.langForm.controls;
  }
}
