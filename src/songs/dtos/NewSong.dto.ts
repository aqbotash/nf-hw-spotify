interface Song {
    title: string;
    artist: string;
    album: string;
    duration: number;
    genre?: string;
    releaseDate?: Date;
    songUrl: string;
  }
  
  export type NewSong = Omit<Song, 'id'>;