import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() scrolled = new EventEmitter<boolean>();

  @ViewChild('header', { static: false }) header: ElementRef;
  @ViewChild('headline', { static: false }) headline: ElementRef;
  @ViewChild('inner', { static: false }) inner: ElementRef;

  opacity = 1;
  transform = '';

  @HostListener('document:scroll', ['']) onScrollEvent() {
    this.initAnimation();
  }

  private initAnimation(): void {
    const headlineRectData = this.headline.nativeElement.getBoundingClientRect();
    const headerRectData = this.header.nativeElement.getBoundingClientRect();

    const navHeight = 75;

    const distanceToTop = headerRectData.top * -1;
    const headlineHeight = headlineRectData.height - navHeight;

    this.scrolled.emit(distanceToTop > headlineHeight);

    if (distanceToTop < headlineHeight) {
      this.opacity = 1 - distanceToTop / headlineHeight;
      this.transform = `translateY(${distanceToTop * 0.4}px)`;
    }
  }
}
