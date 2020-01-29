import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContactData, SendingEmailProgressStatus } from './components/contact-form/contact-form.component';
import { CalculationData } from './components/distance-calculator/distance-calculator.service';
import { DataForEmail, EmailService } from './shared/services/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  scrolled = false;
  calculationData: CalculationData;
  emailSendingProgress: SendingEmailProgressStatus;

  constructor(private translateService: TranslateService, private readonly emailService: EmailService) {
    this.initI18n();
  }

  private initI18n(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('gb');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('gb');
  }

  calculationDataChange(data: CalculationData): void {
    this.calculationData = data;
  }

  sendContactEmail(contactData: ContactData) {
    const dataForEmail: DataForEmail = contactData;
    this.emailSendingProgress = SendingEmailProgressStatus.PENDING;
    if (contactData.includeCalculationData) {
      dataForEmail.calculationData = this.calculationData;
    }
    this.emailService.sendContactEmail(dataForEmail).subscribe(
      () => (this.emailSendingProgress = SendingEmailProgressStatus.SUCCESSFUL),
      () => (this.emailSendingProgress = SendingEmailProgressStatus.ERROR)
    );
  }
}
