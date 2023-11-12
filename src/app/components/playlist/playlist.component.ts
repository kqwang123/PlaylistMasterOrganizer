import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Playlist } from '../playlist/playlist';
import { LightboxService } from 'src/app/services/lightbox.service';
import { Song } from '../song/song';

@Component({
  selector: 'pmo-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist!: Playlist;
  filteredGenres: string[] = [];
  showTracks: boolean = false;

  constructor(private _spotifyService: SpotifyService, private _lightboxService: LightboxService) { }

  ngOnInit(): void {
    this.getTracks();
  }

  trackHasFilteredGenre(track: Song): boolean {
    if (!this.filteredGenres || this.filteredGenres.length === 0) {
      return true;
    }
  
    const trackGenres = track.genres || [];
    return trackGenres.some((genre: string) => this.filteredGenres.includes(genre));
  }

  handleTagSelection(tag: string): void {
    if (!this.filteredGenres.includes(tag)) {
      this.filteredGenres.push(tag);
    } else {
      this.filteredGenres = this.filteredGenres.filter(genre => genre !== tag);
    }
  }

  toggleTracks(): void {
    this.showTracks = !this.showTracks;
  }

  async getTracks(): Promise<void> {
    try {
      let tracks = await this._spotifyService.getData(`playlists/${this.playlist.id}/tracks`);
      if (tracks && tracks.items) {
        this.playlist.tracks = tracks.items.map((item: any) => {
          return {
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            image: item.track.album.images[0].url,
            id: item.track.id,
            genres: []
          }
        });

        while (tracks.next) {
          tracks = await this._spotifyService.getData(tracks.next.substring(27, tracks.next.length));
          if (tracks && tracks.items) {
            const trackPage = tracks.items.map((item: any) => {
              return {
                name: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                image: item.track.album.images[0].url,
                id: item.track.id,
                genres: []
              }
            });
            this.playlist.tracks.push(...trackPage);
          }
        }
      }
    }
    catch (error) {
      console.log("Error fetching tracks:", error);
      throw error;
    }
  }

  openLightbox(): void {
    this._lightboxService.setActiveImageUrl(this.playlist.image);
    document.body.classList.add('no-scroll'); // prevents scrolling in body when lightbox is open
  }
}
