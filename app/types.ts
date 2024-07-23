export interface User {
    id: string | null;
    userName: string | null;
    email: string | null;
    profileImg: string | null;
} 

export interface Session {
    user: User | null;
}

export interface Song {
    id: number;
    playlistId: number;
    name: string;
    artist: string;
    src: string;
    duration: string;
    coverSrc: string;
}

export interface PlaylistSong {
    name: string
    writer: string,
    img: string,
    src: string,
    id: number,
}

export interface Playlist {
    id: string;
    name: string;
    songs: Song[] | null;
}