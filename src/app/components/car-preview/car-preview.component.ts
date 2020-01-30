import { Component } from '@angular/core';

@Component({
  selector: 'app-car-preview',
  templateUrl: './car-preview.component.html',
  styleUrls: ['./car-preview.component.scss'],
})
export class CarPreviewComponent {
  isAutoPlay = true;
  currentIndex = 0;
  vehiclesInfo = [
    {
      name: 'Mercedes-AMG GLA 35 4MATIC',
      consumption: '7,5-7,4 l/100 km',
      km: '200k km',
      image: 'assets/images/amg.jpg',
    },
    {
      name: 'Mercedes-Benz GLC F-CELL',
      consumption: '0.91 kg/100 km',
      km: '400k km',
      image: 'assets/images/glc.jpg',
    },
  ];
}
