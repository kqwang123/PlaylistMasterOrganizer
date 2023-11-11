import { Component, Input } from '@angular/core';

@Component({
  selector: 'pmo-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() name!: string;

  constructor() { }

}
