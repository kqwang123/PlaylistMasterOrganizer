import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'pmo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit(): void { }

  login(): void {
    this._spotifyService.login();
    this.loggedIn.emit(true);
  }
}
