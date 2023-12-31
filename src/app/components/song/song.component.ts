import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LightboxService } from 'src/app/services/lightbox.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'pmo-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  
  @Input() song!: any;
  @Input() selectedTags: string[] = [];
  @Output() tagSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _spotifyService: SpotifyService, private _lightboxService: LightboxService) { }

  ngOnInit(): void {
    this.song.genres = [];
    this.getGenres();
  }

  onTagSelected(tag: string): void {
    this.tagSelected.emit(tag);
  }

  async getGenres(): Promise<void> {
    try {
      for (let el of this.song.artists) {
        const artistID = el.id;
        const artist = await this._spotifyService.getData(`artists/${artistID}`);
        const newGenres = artist.genres.filter((genre: string) => !this.song.genres.includes(genre));

        this.song.genres.push(...newGenres);
      }

      // TODO: Implement album genres when they are released on spotify api

      // const albumID = track.album.id;
      // const album = await this._spotifyService.getData(`albums/${albumID}`);
      // const newGenres = album.genres.filter((genre: string) => !this.genres.includes(genre));
      // this.genres.push(...newGenres);

      this.song.genres.sort();      
    }
    catch (error) {
      console.log("Error fetching genres:", error);
      throw error;
    }
  }

  openLightbox(): void {
    this._lightboxService.setActiveImageUrl(this.song.album.images[0].url);
    document.body.classList.add('no-scroll'); // prevents scrolling in body when lightbox is open
  }

  getArtists(): string {
    return this.song.artists.map((a: any) => a.name).join(', ');
  }
}
