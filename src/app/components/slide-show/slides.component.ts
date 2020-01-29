import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SlideshowComponent } from 'ng-simple-slideshow/src/app/modules/slideshow/slideshow.component';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent {
  @ViewChild('slideShow', { static: false }) slideShow: SlideshowComponent;

  @Input() imageSources: string[];
  @Input() autoplay = true;
  @Output() indexChange: EventEmitter<number> = new EventEmitter();

  onIndexChange(newIndex): void {
    this.indexChange.emit(newIndex);
  }
}
