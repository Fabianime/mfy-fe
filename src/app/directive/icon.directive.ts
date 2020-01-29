import { Directive, ElementRef, Input, OnInit } from '@angular/core';

export interface IconData {
  icon: string;
  size: IconDataSize;
}
export enum IconDataSize {
  SMALL = 'small',
  NORMAL = 'normal',
  Large = 'large',
}
export enum IconDataColor {
  WHITE = 'white',
  BLACK = 'black',
  LIGHTGREY = 'lightgrey',
}
export enum IconDataAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

@Directive({
  selector: '[appIcon]',
})
export class IconDirective implements OnInit {
  @Input() appIcon: string;
  @Input() appIconSize: IconDataSize;
  @Input() appIconColor: IconDataColor;
  @Input() appIconAlignment: IconDataAlignment;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    const baseElement = this.element.nativeElement;
    this.element.nativeElement.parentNode.insertBefore(this.createIconElement(), baseElement);
  }

  private createIconElement(): Node {
    const iconElement = document.createElement('div');
    const iconSizeClass = `icon-${this.appIconSize || IconDataSize.NORMAL}`;
    const iconColorClass = `icon-${this.appIconColor || IconDataColor.WHITE}`;
    const iconAlignmentClass = `icon-${this.appIconAlignment || IconDataAlignment.START}`;

    iconElement.innerHTML =
      `<svg class="icon ${iconSizeClass} ${iconColorClass} ${iconAlignmentClass}">` +
      `<use href="assets/svgs/global.svg#${this.appIcon}"></use></svg>`;
    return iconElement.firstChild;
  }
}
