import { Component, Input, OnInit } from '@angular/core';
import { Song } from './song';
import { LightboxService } from 'src/app/services/lightbox.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'pmo-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  
  @Input() song!: Song;
  genres: string[] = [];

  constructor(private _spotifyService: SpotifyService, private _lightboxService: LightboxService) { }

  ngOnInit(): void {
    this.getGenres();
  }
  async getGenres(): Promise<void> {
    try {
      const track = await this._spotifyService.getData(`tracks/${this.song.id}`);
      const id = track.artists[0].id;
      const artist = await this._spotifyService.getData(`artists/${id}`);
      this.genres = artist.genres;

      // TODO: Implement album genres when they are released
      
    }
    catch (error) {
      console.log("Error fetching genres:", error);
      throw error;
    }
  }

  openLightbox(): void {
    this._lightboxService.setActiveImageUrl(this.song.image);
    document.body.classList.add('no-scroll'); // prevents scrolling in body when lightbox is open
  }
}
