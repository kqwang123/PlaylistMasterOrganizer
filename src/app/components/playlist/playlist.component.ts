import { Component, Input } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Playlist } from '../playlist/playlist';

@Component({
  selector: 'pmo-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  @Input() playlist!: Playlist;

  constructor(private _spotifyService: SpotifyService) { }

  printData(): void {
    console.log(this.playlist);
  }

}
