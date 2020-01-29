// localisation
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

export interface ContactData {
  fullName: string;
  email: string;

  message?: string;
  phoneNumber?: string;
  includeCalculationData?: boolean;
}

export enum SendingEmailProgressStatus {
  PENDING = 'pending',
  SUCCESSFUL = 'successful',
  ERROR = 'error',
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() showIncludeCalculationData = false;
  @Input() isEmailSendingSuccessful = SendingEmailProgressStatus.PENDING;
  @Output() sendContactData = new EventEmitter<ContactData>();

  SendingEmailProgressStatus = SendingEmailProgressStatus;

  dataWasSend = false;

  contactFormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(),
    includeCalculationData: new FormControl(),
    message: new FormControl(''),
  });

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

  getEmailSendingStatusHeadline() {
    let eMailHeadline = 'Pending';
    eMailHeadline =
      this.isEmailSendingSuccessful === SendingEmailProgressStatus.SUCCESSFUL ? 'Successful' : eMailHeadline;
    eMailHeadline = this.isEmailSendingSuccessful === SendingEmailProgressStatus.ERROR ? 'Error' : eMailHeadline;

    return eMailHeadline;
  }
}
