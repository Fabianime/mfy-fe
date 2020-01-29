import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

export interface AutoCompleteOption {
  id: string;
  name: string;
}
@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit {
  @Input() label: string;
  @Input() options: AutoCompleteOption[];
  @Output() valueChanges = new EventEmitter();
  @Output() selected = new EventEmitter();

  searchParamFormControl = new FormControl();
  showLoading = false;
  inFocus = false;
  private selectedOption: string;

  ngOnInit() {
    this.searchParamFormControl.valueChanges
      .pipe(
        tap((searchParam: string) => (this.showLoading = !!searchParam.length)),
        debounceTime(1000),
        tap(() => (this.showLoading = false))
      )
      .subscribe((searchParam: string) => {
        this.valueChanges.emit(searchParam);
      });
  }

  onFocus() {
    this.inFocus = true;
    const searchParam = this.searchParamFormControl.value;

    if (searchParam) {
      this.valueChanges.emit(searchParam);
    }
  }

  onBlur() {
    this.inFocus = false;
    this.options = [];
  }

  optionSelected({ id, name }: AutoCompleteOption) {
    this.selectedOption = id;
    this.searchParamFormControl.patchValue(name, { emitEvent: false });
    this.selected.emit(id);
  }
}
