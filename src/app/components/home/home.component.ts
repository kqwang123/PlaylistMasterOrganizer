import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'pmo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  playlists: any[] = [];

  constructor(private _spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
  }

  async getPlaylists(): Promise<void> {
    try {
      const playlists = await this._spotifyService.getData("me/playlists");
      if (playlists && playlists.items) {
        this.playlists = playlists.items;
      }

    } catch (error) {
      console.log("Error fetching playlists:", error);
      throw error;
    }
  }
}
