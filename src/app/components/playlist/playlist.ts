import { Song } from '../song/song';

export interface Playlist {
    name: string;
    description: string;
    id: string;
    tracks: Song[];
}