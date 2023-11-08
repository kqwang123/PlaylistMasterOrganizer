import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private _clientId: string = "";
  private _clientSecret: string = "";
  private _redirectUri = 'http://localhost:4200/callback';

  private _accessToken = null;

  constructor(private _httpClient: HttpClient) {
    
    this._clientId = environment.CLIENT_ID;
    this._clientSecret = environment.CLIENT_SECRET;

  }

  login(): void {
    const auth_query_parameters = new URLSearchParams({
      response_type: 'code',
      client_id: this._clientId,
      redirect_uri: this._redirectUri,
    });

    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${auth_query_parameters.toString()}`;

    window.location.href = spotifyAuthUrl;
  }

  exchangeCodeForToken(code: string): void {
    const body = new URLSearchParams({
      code: code,
      redirect_uri: this._redirectUri,
      grant_type: 'authorization_code',
    });

    this._httpClient.post<any>(
      'https://accounts.spotify.com/api/token',
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${this._clientId}:${this._clientSecret}`)}`,
        },
      }
    ).subscribe(response => {
      this._accessToken = response.access_token;
    });
  }

  async getData(endpoint: string): Promise<any> {
    if (this._accessToken === null) {
      return null;
    } else {
      try {
        const response = await this._httpClient.get<any>(
          `https://api.spotify.com/v1/${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${this._accessToken}`,
            },
          }
        ).toPromise();

        return response;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  }
}
