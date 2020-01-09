import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @Output()
  scrolledChange = new EventEmitter<boolean>();

  @Input()
  get scrolled(): boolean {
    return this._scrolled;
  }

  set scrolled(val) {
    this._scrolled = val;
    this.scrolledChange.emit(this._scrolled);
  }

  @ViewChild('header', { static: false }) header: ElementRef;
  @ViewChild('headline', { static: false }) headline: ElementRef;
  @ViewChild('inner', { static: false }) inner: ElementRef;

  opacity = 1;
  transform = '';

  private _scrolled: boolean;

  constructor() {}

  ngAfterViewInit(): void {
    this.initAnimation();
  }

  @HostListener('document:scroll', ['$event']) onScrollEvent() {
    this.initAnimation();
  }

  private initAnimation(): void {
    const headlineRectData = this.headline.nativeElement.getBoundingClientRect();
    const headerRectData = this.header.nativeElement.getBoundingClientRect();

    const navHeight = 75;

    const distanceToTop = headerRectData.top * -1;
    const headlineHeight = headlineRectData.height - navHeight;

    this.opacity = 1 - distanceToTop / headlineHeight;
    this.transform = `translateY(${distanceToTop * 0.4}px)`;
    this.scrolled = distanceToTop > headlineHeight;
  }
}
