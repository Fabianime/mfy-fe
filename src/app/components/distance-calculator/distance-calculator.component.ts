import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AutoCompleteOption } from '../../shared/components/auto-complete/auto-complete.component';
import { CalculationData, DistanceData } from './distance-calculator.model';
import { DistanceCalculatorService } from './distance-calculator.service';

@Component({
  selector: 'app-distance-calculator',
  templateUrl: './distance-calculator.component.html',
  styleUrls: ['./distance-calculator.component.scss'],
})
export class DistanceCalculatorComponent implements AfterViewInit {
  @Output() calculationData = new EventEmitter<CalculationData>();
  @ViewChild('directionMap', { static: false }) directionMap: ElementRef;

  startLocationOptions: AutoCompleteOption[];
  destinationLocationOptions: AutoCompleteOption[];

  // ToDo: remove API key
  defaultDirectionsUrl = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDEL2h-pxbQjnymytTP5jqB58mKgfV9eQk';
  currentCalculationData: CalculationData;

  showMore = false;

  private selectedOriginId = '';
  private selectedDestinationId = '';

  private currentLanguage = '';

  constructor(
    private readonly distanceCalculatorService: DistanceCalculatorService,
    private readonly translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.currentLanguage = this.getValidLanguageCode(this.translateService.currentLang);
    this.updateIframeUrl('ChIJB2mM1AzZmUcRWYaHb2p3xdc', 'ChIJB2mM1AzZmUcRWYaHb2p3xdc');

    this.translateService.onLangChange
      .pipe(
        map(({ lang }: LangChangeEvent) => this.getValidLanguageCode(lang)),
        tap((languageCode: string) => (this.currentLanguage = languageCode))
      )
      .subscribe(() => this.updateIframeUrl());
  }

  searchStartPosition(searchParam: string) {
    this.selectedOriginId = '';
    this.getOptionsForAutoComplete(searchParam).subscribe((options) => (this.startLocationOptions = options));
  }

  searchDestinationPosition(searchParam: string) {
    this.selectedDestinationId = '';
    this.getOptionsForAutoComplete(searchParam).subscribe((options) => (this.destinationLocationOptions = options));
  }

  selectedStartPosition(id: string) {
    this.selectedOriginId = id;
    this.startSearch();
  }

  selectedDestinationPosition(id: string) {
    this.selectedDestinationId = id;
    this.startSearch();
  }

  private getOptionsForAutoComplete(searchParam: string): Observable<AutoCompleteOption[]> {
    return this.distanceCalculatorService.test2(searchParam).pipe(map((data) => data.predictions));
  }

  private startSearch(): void {
    if (!this.selectedOriginId || !this.selectedDestinationId) {
      return;
    }

    this.updateIframeUrl();

    this.distanceCalculatorService
      .distance(this.selectedOriginId, this.selectedDestinationId)
      .subscribe((distanceData) => this.startCalculation(distanceData));
  }

  private startCalculation({ start_address, end_address, totalDistance }: DistanceData): void {
    this.currentCalculationData = this.distanceCalculatorService.calculate(totalDistance);
    this.currentCalculationData.origin = start_address;
    this.currentCalculationData.destination = end_address;

    this.calculationData.emit(this.currentCalculationData);
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  private getValidLanguageCode(currentLang: string) {
    return currentLang === 'gb' ? 'en' : currentLang;
  }

  private updateIframeUrl(paramOriginId = '', paramDestinationId = '') {
    const originId = this.selectedOriginId || paramOriginId;
    const destinationId = this.selectedDestinationId || paramDestinationId;

    if (!originId || !destinationId) {
      return;
    }

    this.directionMap.nativeElement.src =
      this.defaultDirectionsUrl +
      '&language=' +
      this.currentLanguage +
      '&origin=place_id:' +
      originId +
      '&destination=place_id:' +
      destinationId;
  }
}
