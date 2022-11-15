export const environment = {
  production: true
};

export const SpotifyConfiguration = {
  clientId: 'a5c34b35a5fe40c38e698e3beb7d7d9f',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  refirectUrl: 'http://localhost:4200/login/',
  scopes: [
    "user-read-currently-playing", //música tocando agora
    "user-read-recently-played", //ler músicas tocadas recentemente
    "user-read-platback-state", //ler estado do player do usuário
    "user-top-read", //top artistas e músicas do usuário
    "user-modify-playback-state", //alterar do player do usuário
    "user-library-read", //ler biblioteca dos usuários
    "playlist-read-private", //ler playlists privadas
    "playlist-read-collaborative" //ler playlists colaborativas
  ]
}