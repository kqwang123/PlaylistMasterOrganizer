import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pmo-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _spotifyService: SpotifyService) {

  }

  ngOnInit(): void {
    const code = this._route.snapshot.queryParams['code'];
    this._spotifyService.exchangeCodeForToken(code);
    this._router.navigate(['/']);
  }
}
