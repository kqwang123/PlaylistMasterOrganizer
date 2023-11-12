import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'pmo-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() name!: string;
  selected: boolean = false;
  @Output() tagSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _el: ElementRef) { }

  toggleSelected(): void {
    this.selected = !this.selected;
    
    const tag = this._el.nativeElement.querySelector('.tag');
    tag.classList.toggle('selected');
    
    this.tagSelected.emit(this.name);
  }
}
