import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  scrolled = false;

  constructor(private translateService: TranslateService) {
    this.initI18n();
  }

  private initI18n(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('gb');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('gb');
  }
}
