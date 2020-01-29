import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactData } from '../../components/contact-form/contact-form.component';
import { CalculationData } from '../../components/distance-calculator/distance-calculatior.model';

export interface DataForEmail extends ContactData {
  calculationData?: CalculationData;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private readonly httpClient: HttpClient) {}

  sendContactEmail(mailContactData: DataForEmail): Observable<any> {
    const { api, path } = environment;
    return this.httpClient.post(api + path.sendContactRequest, mailContactData);
  }
}
