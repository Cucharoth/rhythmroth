# RHYTHMROTH
FullStack NextJS APP that let's you listen to music and create personalized playlist.


## API
*check .app/types for more info*

- POST `api/auth/login` - requires: `User`, returns `User`
- GET `api/song/:id` - returns `Song`
- GET `api/song/all` - returns `Song[]`
- POST `api/playlist/create` - requires: `UserId, Playlist`, returns `Playlist`
- GET `api/playlist/:id` - returns `Playlist`
- GET `api/playlist/user-id/:id` - returns `Playlist[]`