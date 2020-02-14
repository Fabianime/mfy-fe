import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent implements OnInit {
  @Input() scrolled: boolean;

  isLanguageDropdownShow = false;
  responsiveMenuIsExpanded = false;
  responsiveLanguageIsExpanded = false;

  currentLanguage: string;
  languageList = [
    { languageCode: 'gb', language: 'English' },
    { languageCode: 'de', language: 'Deutsch' },
    { languageCode: 'tr', language: 'Türkçe' },
  ];

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

  toggleMenu() {
    this.responsiveMenuIsExpanded = !this.responsiveMenuIsExpanded;
    this.responsiveLanguageIsExpanded = this.responsiveLanguageIsExpanded
      ? this.responsiveMenuIsExpanded
      : this.responsiveLanguageIsExpanded;
  }

  toggleLanguage() {
    this.responsiveLanguageIsExpanded = !this.responsiveLanguageIsExpanded;
  }
}
