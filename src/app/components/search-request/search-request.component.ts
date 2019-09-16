import { Component } from '@angular/core';

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.component.html',
  styleUrls: ['./search-request.component.scss']
})
export class SearchRequestComponent {
  selectedLang!: string;

  onSelectLang(language: string) {
    this.selectedLang = language;
  }
}
