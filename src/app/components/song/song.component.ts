import { Component, Input } from '@angular/core';
import { Song } from './song';

@Component({
  selector: 'pmo-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {
  
  @Input() song!: Song;

  constructor() { }
}
