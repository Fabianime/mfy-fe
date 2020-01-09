import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appIcon]',
})
export class IconDirective implements OnInit {
  @Input('appIcon') icon: string;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    const baseElement = this.element.nativeElement;
    this.element.nativeElement.parentNode.insertBefore(this.createIconElement(), baseElement);
  }

  private createIconElement(): Node {
    const iconElement = document.createElement('div');
    iconElement.innerHTML = `<svg class="icon"><use href="assets/svgs/global.svg#${this.icon}"></use></svg>`;
    return iconElement.firstChild;
  }
}
