import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

export enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() errorMessage: string;
  @Input() componentControl: FormControl | AbstractControl;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() inputType = InputType.TEXT;

  hasError(): boolean {
    return !!(
      this.componentControl &&
      this.componentControl.touched &&
      !this.componentControl.valid &&
      this.componentControl.invalid
    );
  }

  isTextField(): boolean {
    return this.inputType === InputType.TEXT;
  }

  isTextareaField(): boolean {
    return this.inputType === InputType.TEXTAREA;
  }
}
