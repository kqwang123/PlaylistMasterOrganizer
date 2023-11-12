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
  display : boolean = true;
  genres: string[] = [];

  constructor(private _spotifyService: SpotifyService, private _lightboxService: LightboxService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  toggleDisplay(): void {
    this.display = !this.display;
  }

  async getGenres(): Promise<void> {
    try {
      const track = await this._spotifyService.getData(`tracks/${this.song.id}`);
      for (let el of track.artists) {
        const artistID = el.id;
        const artist = await this._spotifyService.getData(`artists/${artistID}`);
        const newGenres = artist.genres.filter((genre: string) => !this.genres.includes(genre));

        this.genres.push(...newGenres);
      }

      // TODO: Implement album genres when they are released on spotify api

      // const albumID = track.album.id;
      // const album = await this._spotifyService.getData(`albums/${albumID}`);
      // const newGenres = album.genres.filter((genre: string) => !this.genres.includes(genre));
      // this.genres.push(...newGenres);

      this.genres.sort();      
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
