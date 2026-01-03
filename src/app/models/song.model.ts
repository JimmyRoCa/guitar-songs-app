export interface SongChord {
  chord: string;
  position: number; // índice dentro del texto
}

export interface SongLine {
  text: string;
  chords: SongChord[];
}

export interface SongSection {
  title?: string;
  lines: SongLine[];
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  key: string;
  sections: SongSection[];
}

