import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AutoComplete {
  predictions: AutoCompleteData[];
}

export interface AutoCompleteData {
  name: string;
  id: string;
}

export interface CalculationData {
  totalCost: number;
  costFirstFourKm: number;
  costAfterFourKm: number;
  distanceInKm: {
    roundedUp: number;
    exact: number;
  };
  origin?: string;
  destination?: string;
}

export interface DistanceData {
  start_address: string;
  end_address: string;
  totalDistance: number;
}

export const calculationBaseData = { basicFee: 3.5, firstFourKmFee: 2.5, afterFourKmFee: 2 };

@Injectable({
  providedIn: 'root',
})
export class DistanceCalculatorService {
  constructor(private readonly httpClient: HttpClient) {}

  test2(searchParam: string): Observable<AutoComplete> {
    const url = 'http://localhost:8080/autocomplete';
    const params = {
      language: 'de',
      input: searchParam,
    };
    return this.httpClient.get<AutoComplete>(url, { params });
  }

  distance(origin: string, destination: string) {
    const url = 'http://localhost:8080/distance';
    const params = {
      origin: 'place_id:' + origin,
      destination: 'place_id:' + destination,
    };

    return this.httpClient.get<DistanceData>(url, { params });
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
