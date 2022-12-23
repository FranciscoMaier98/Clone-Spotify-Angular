import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/iusuario';
import { IPlaylist } from '../interfaces/IPlaylist';
import { SpotifyPlaylistParaPlaylist, SpotifyUserParaUsuario } from '../Common/spotifyHelper';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs;
  usuario: IUsuario;

  constructor() {
    this.spotifyApi = new Spotify();
   }

   async inicializarUsuario() {
    if(!!this.usuario) {
      return true;
    }

    const token = localStorage.getItem('token');
    
    if(!token) {
      return false;
    }

    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUser();
      return !!this.usuario;
    } catch(ex) {
      return false;
    }
   }

   async obterSpotifyUser() {
    // console.log(await this.spotifyApi.getMe());
    const userInfo = await this.spotifyApi.getMe();
    // console.log(userInfo);
    this.usuario = SpotifyUserParaUsuario(userInfo);
   }

  obterUrlLogin() {
    const authEndingPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.refirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndingPoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if(!window.location.hash) {
      return '';
    }   
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {offset, limit});
    //return playlists.items.map(x => SpotifyPlaylistParaPlaylist(x));
    console.group(playlists);
    //Carrega as playlists
    return playlists.items.map(SpotifyPlaylistParaPlaylist); //Simplificado
    
  }

}
