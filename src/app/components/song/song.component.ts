import { Component, Input } from '@angular/core';
import { Song } from './song';
import { LightboxService } from 'src/app/services/lightbox.service';

@Component({
  selector: 'pmo-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {
  
  @Input() song!: Song;

  constructor(private _lightboxService: LightboxService) { }
  openLightbox(): void {
    this._lightboxService.setActiveImageUrl(this.song.image);
    document.body.classList.add('no-scroll');
  }
}
