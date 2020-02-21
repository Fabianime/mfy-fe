import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, of } from 'rxjs';
import { ContactData, EmailSendingStatus } from './contact-form.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() showIncludeCalculationData = false;
  @Input() emailSendingStatus = EmailSendingStatus.PENDING;
  @Output() sendContactData = new EventEmitter<ContactData>();

  SendingEmailProgressStatus = EmailSendingStatus;

  dataWasSend = false;

  contactFormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(),
    includeCalculationData: new FormControl(),
    message: new FormControl(''),
  });

  private pendingHeadline = '';
  private successHeadline = '';
  private errorHeadline = '';

  private pendingSubHeadline = '';
  private successSubHeadline = '';
  private errorSubHeadline = '';

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit() {
    this.initHeadlines();
  }

  get fullNameControl(): AbstractControl {
    return this.contactFormGroup.get('fullName');
  }

  get emailControl(): AbstractControl {
    return this.contactFormGroup.get('email');
  }

  get phoneNumberControl(): AbstractControl {
    return this.contactFormGroup.get('phoneNumber');
  }

  get calcDataControl(): AbstractControl {
    return this.contactFormGroup.get('includeCalculationData');
  }

  get messageControl(): AbstractControl {
    return this.contactFormGroup.get('message');
  }

  sendDataIfValid(): void {
    this.contactFormGroup.markAllAsTouched();
    if (this.contactFormGroup.invalid) {
      return;
    }

    this.sendContactData.emit(this.removeNull(this.contactFormGroup.value));
    this.dataWasSend = true;
  }

  private removeNull(contactData: ContactData): ContactData {
    const clonedContactData = { ...contactData };
    if (clonedContactData.includeCalculationData === null) {
      delete clonedContactData.includeCalculationData;
    }
    if (clonedContactData.phoneNumber === null) {
      delete clonedContactData.phoneNumber;
    }

    return clonedContactData;
  }

  getContactFormHeadline(): Observable<string> {
    if (!this.dataWasSend) {
      return this.translateService.get('contactForm.headline.main');
    }

    let eMailHeadline = this.pendingHeadline;
    eMailHeadline = this.emailSendingStatus === EmailSendingStatus.SUCCESSFUL ? this.successHeadline : eMailHeadline;
    eMailHeadline = this.emailSendingStatus === EmailSendingStatus.ERROR ? this.errorHeadline : eMailHeadline;

    return of(eMailHeadline);
  }

  getContactFormSubHeadline(): Observable<string> {
    if (!this.dataWasSend) {
      return this.translateService.get('contactForm.subHeadline.main');
    }

    let eMailSubHeadline = this.pendingSubHeadline;

    eMailSubHeadline =
      this.emailSendingStatus === EmailSendingStatus.SUCCESSFUL ? this.successSubHeadline : eMailSubHeadline;

    eMailSubHeadline = this.emailSendingStatus === EmailSendingStatus.ERROR ? this.errorSubHeadline : eMailSubHeadline;

    return of(eMailSubHeadline);
  }

  private initHeadlines() {
    // init headlines
    combineLatest(
      this.translateService.get('contactForm.headline.pending'),
      this.translateService.get('contactForm.headline.success'),
      this.translateService.get('contactForm.headline.error')
    ).subscribe(([pendingHeadline, successHeadline, errorHeadline]) => {
      this.pendingHeadline = pendingHeadline;
      this.successHeadline = successHeadline;
      this.errorHeadline = errorHeadline;
    });

    // init subHeadlines
    combineLatest(
      this.translateService.get('contactForm.subHeadline.pending'),
      this.translateService.get('contactForm.subHeadline.success'),
      this.translateService.get('contactForm.subHeadline.error')
    ).subscribe(([pendingSubHeadline, successSubHeadline, errorSubHeadline]) => {
      this.pendingSubHeadline = pendingSubHeadline;
      this.successSubHeadline = successSubHeadline;
      this.errorSubHeadline = errorSubHeadline;
    });
  }
}
