import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class AutoCompleteComponent implements OnInit, OnChanges {
  @Output() valueChanges = new EventEmitter();
  @Output() selected = new EventEmitter();

  @Input() label: string;
  @Input() options: AutoCompleteOption[];

  searchParamFormControl = new FormControl();
  showLoading = false;
  isSearchStarted = false;
  private selectedOption: string;
  private wasFocusLost = false;

  ngOnInit() {
    this.searchParamFormControl.valueChanges
      .pipe(
        tap(() => (this.isSearchStarted = true)),
        tap((searchParam: string) => (this.showLoading = !!searchParam.length)),
        tap(() => (this.options = [])),
        debounceTime(1000)
      )
      .subscribe((searchParam: string) => {
        this.valueChanges.emit(searchParam);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.showLoading = false;
      this.options = this.wasFocusLost ? [] : changes['options'].currentValue;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }

    const searchParam = this.searchParamFormControl.value;
    this.showLoading = !!searchParam;
    this.isSearchStarted = true;

    if (searchParam) {
      this.valueChanges.emit(searchParam);
    }
  }

  onBlur() {
    this.isSearchStarted = false;
    this.showLoading = false;
    this.wasFocusLost = true;
    this.options = [];
  }

  onFocus() {
    this.wasFocusLost = false;
  }

  optionSelected({ id, name }: AutoCompleteOption) {
    this.selectedOption = id;
    this.searchParamFormControl.patchValue(name, { emitEvent: false });
    this.selected.emit(id);
  }
}
