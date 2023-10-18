import { Song } from '../song/song';

export interface Playlist {
    name: string;
    description: string;
    id: string;
    image: string;
    tracks: Song[];
}