import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactData } from '../../components/contact-form/contact-form.component';
import { CalculationData } from '../../components/distance-calculator/distance-calculator.service';

export interface DataForEmail extends ContactData {
  calculationData?: CalculationData;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private readonly httpClient: HttpClient) {}

  sendContactEmail(mailContactData: DataForEmail): Observable<any> {
    return this.httpClient.post('http://localhost:8080/sendContactRequest', mailContactData);
  }
}
