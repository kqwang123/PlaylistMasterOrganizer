import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Playlist } from '../playlist/playlist';

@Component({
  selector: 'pmo-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist!: Playlist;
  showTracks: boolean = false;

  constructor(private _spotifyService: SpotifyService) { }

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
            id: item.track.id
          }
        });
      }
      console.log("Tracks:", this.playlist.tracks);
    }
    catch (error) {
      console.log("Error fetching tracks:", error);
      throw error;
    }
  }
}
