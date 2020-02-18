import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  defaultDirectionsUrl = 'https://www.google.com/maps/embed/v1/directions?zoom=8&key=';
  currentCalculationData: CalculationData;

  showMore = false;

  private selectedOriginId: string;
  private selectedDestinationId: string;

  constructor(private readonly distanceCalculatorService: DistanceCalculatorService) {}

  ngAfterViewInit(): void {
    // ToDo: Remove Key.
    const defaultDirectionsParams =
      'AIzaSyDEL2h-pxbQjnymytTP5jqB58mKgfV9eQk' +
      '&origin=place_id:ChIJB2mM1AzZmUcRWYaHb2p3xdc' +
      '&destination=place_id:ChIJB2mM1AzZmUcRWYaHb2p3xdc';

    this.directionMap.nativeElement.src = this.defaultDirectionsUrl + defaultDirectionsParams;
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
    this.directionMap.nativeElement.src =
      this.defaultDirectionsUrl +
      'AIzaSyDEL2h-pxbQjnymytTP5jqB58mKgfV9eQk&origin=place_id:' +
      this.selectedOriginId +
      '&destination=place_id:' +
      this.selectedDestinationId;

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
}
