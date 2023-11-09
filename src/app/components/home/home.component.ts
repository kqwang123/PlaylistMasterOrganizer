import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Playlist } from '../playlist/playlist';

@Component({
  selector: 'pmo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  playlists: Playlist[] = [];

  constructor(private _spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
  }

  async getPlaylists(): Promise<void> {
    try {
      const playlists = await this._spotifyService.getData("me/playlists");
      if (playlists && playlists.items) {
        this.playlists = playlists.items.map((item: any) => {
          return {
            name: item.name,
            description: item.description,
            id: item.id,
            image: item.images[0].url,
            tracks: item.tracks
          }
        });
      }

    } catch (error) {
      console.log("Error fetching playlists:", error);
      throw error;
    }
  }
}
