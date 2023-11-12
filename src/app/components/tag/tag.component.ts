import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'pmo-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() name!: string;
  @Input() selectedTags: string[] = [];
  get selected(): boolean {
    return this.selectedTags.includes(this.name);
  }

  @Output() tagSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  toggleSelected(): void {
    this.tagSelected.emit(this.name);
    console.log(this.selected);
  }
}