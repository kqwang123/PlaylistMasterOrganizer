import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { LightboxService } from 'src/app/services/lightbox.service';

@Component({
  selector: 'pmo-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist!: any;
  tracks: any[] = [];
  filteredGenres: string[] = [];
  showTracks: boolean = false;

  constructor(private _spotifyService: SpotifyService, private _lightboxService: LightboxService) { }

  ngOnInit(): void {
    this.getTracks();
  }

  trackHasFilteredGenre(genres: string[]): boolean {
    if (!this.filteredGenres || this.filteredGenres.length === 0) {
      return true;
    }
  
    const trackGenres = genres || [];
    return this.filteredGenres.every(genre => trackGenres.includes(genre));
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
      let trackIDs = [];

      for (let el of tracks.items) {
        trackIDs.push(el.track.id);
      }
      while (tracks.next) {
        tracks = await this._spotifyService.getData(tracks.next.substring(27, tracks.next.length));
        if (tracks && tracks.items) {
          for (let el of tracks.items) {
            trackIDs.push(el.track.id);
          }
        }
      }

      // spotify can only return 50 tracks at a time, so we need to make multiple requests

      for (let i = 0; i < trackIDs.length; i += 50) {
        const trackIDsString = trackIDs.slice(i, i + 50).join(',');
        const tracksData = await this._spotifyService.getData(`tracks?ids=${trackIDsString}`);
        if (tracksData && tracksData.tracks) {
          this.tracks.push(...tracksData.tracks);
        }
      }
    }
    catch (error) {
      console.log("Error fetching tracks:", error);
      throw error;
    }
  }

  openLightbox(): void {
    this._lightboxService.setActiveImageUrl(this.playlist.images[0].url);
    document.body.classList.add('no-scroll'); // prevents scrolling in body when lightbox is open
  }
}
