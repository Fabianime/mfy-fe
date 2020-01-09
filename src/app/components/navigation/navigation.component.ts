import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() scrolled: boolean;
  isLanguageDropdownShow = false;
  currentLanguage: string;

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe(({ lang }: LangChangeEvent) => (this.currentLanguage = lang));
  }

  openLanguageDropdown() {
    this.isLanguageDropdownShow = true;
  }

  switchLanguage(language: string): void {
    this.translateService.use(language);
  }
}
