import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AutoComplete, CalculationData, DistanceData } from './distance-calculator.model';

export const calculationBaseData = { basicFee: 3.5, firstFourKmFee: 2.5, afterFourKmFee: 2 };

@Injectable({
  providedIn: 'root',
})
export class DistanceCalculatorService {
  constructor(private readonly httpClient: HttpClient) {}

  test2(searchParam: string): Observable<AutoComplete> {
    const { api, path } = environment;
    const params = {
      language: 'de',
      input: searchParam,
    };
    return this.httpClient.get<AutoComplete>(api + path.google.autocomplete, { params });
  }

  distance(origin: string, destination: string) {
    const { api, path } = environment;
    const params = {
      origin: 'place_id:' + origin,
      destination: 'place_id:' + destination,
    };

    return this.httpClient.get<DistanceData>(api + path.google.distance, { params });
  }

  calculate(distanceInMeters: number): CalculationData {
    const { basicFee, firstFourKmFee, afterFourKmFee } = calculationBaseData;
    const distanceInKm = Math.ceil(distanceInMeters / 1000);

    let totalCost = basicFee;
    let costFirstFourKm = 0;

    for (let i = 0; i < distanceInKm; i++) {
      const feePerKm = i < 4 ? firstFourKmFee : afterFourKmFee;
      totalCost += feePerKm;

      costFirstFourKm = i + 1 === 4 || (i <= 4 && i + 1 === distanceInKm) ? totalCost : costFirstFourKm;
    }
    const costAfterFourKm = costFirstFourKm !== totalCost ? totalCost - costFirstFourKm : 0;

    return {
      totalCost,
      costFirstFourKm,
      costAfterFourKm,
      distanceInKm: { roundedUp: distanceInKm, exact: distanceInMeters / 1000 },
    };
  }
}
