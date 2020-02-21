export interface AutoComplete {
  predictions: AutoCompleteData[];
}

export interface AutoCompleteData {
  name: string;
  id: string;
}

export interface CalculationData {
  totalCost: string;
  costFirstFourKm: string;
  costAfterFourKm: string;
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
