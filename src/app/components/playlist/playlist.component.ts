import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Playlist } from '../playlist/playlist';
import { LightboxService } from 'src/app/services/lightbox.service';

@Component({
  selector: 'pmo-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist!: Playlist;
  showTracks: boolean = false;

  constructor(private _spotifyService: SpotifyService, private _lightboxService: LightboxService) { }

  ngOnInit(): void {
    this.getTracks();
  }

  toggleTracks(): void {
    this.showTracks = !this.showTracks;
  }

  async getTracks(): Promise<void> {
    try {
      const tracks = await this._spotifyService.getData(`playlists/${this.playlist.id}/tracks`);
      if (tracks && tracks.items) {
        this.playlist.tracks = tracks.items.map((item: any) => {
          return {
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            image: item.track.album.images[0].url,
            id: item.track.id
          }
        });
      }
    }
    catch (error) {
      console.log("Error fetching tracks:", error);
      throw error;
    }
  }

  openLightbox(): void {
    this._lightboxService.setActiveImageUrl(this.playlist.image);
    document.body.classList.add('no-scroll');
  }
}
