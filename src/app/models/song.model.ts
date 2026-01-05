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

  /** Tipo de sección: acordes o tabs */
  type?: 'chords' | 'tabs';

  /** Para secciones de acordes */
  lines?: SongLine[];

  /** Para secciones de tabs */
  tabs?: Array<String>;
}


export interface Song {
  id: number;
  title: string;
  artist: string;
  key: string;
  sections: SongSection[];
}

