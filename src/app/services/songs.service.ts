import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private songsUrl = 'songs/songs.json';

  constructor(private http: HttpClient) {}

  getSongById(id: number): Observable<Song | undefined> {
  return new Observable(observer => {
    this.getSongs().subscribe(songs => {
      observer.next(songs.find(song => song.id === id));
        observer.complete();
        });
    });
}

private readonly CHORD_REGEX =
  /\b([A-G][#b]?(maj7|m7|sus2|sus4|add9|add2|min|maj|dim|aug|m|7|5)?(\/[A-G][#b]?)?)\b/g;


getSongs(): Observable<Song[]> {
  const localSongs = this.getLocalSongs().map(song =>
    this.normalizeSong(song)
  );

  return this.http.get<any[]>(this.songsUrl).pipe(
    map(jsonSongs =>
      [...jsonSongs, ...localSongs].map(song =>
        this.normalizeSong(song)
      )
    )
  );
}

parseAndCreateSong(data: {
  title: string;
  artist: string;
  key: string;
  rawText: string;
}): Song {

  const lines = data.rawText.split('\n');
  const sections: any[] = [];

  let currentSection: any = { title: undefined, lines: [] };
  let pendingChords: { chord: string; position: number }[] | null = null;



  const cleanLine = (l: string) =>
    l.replace(/\r/g, '').trim();

const isChord = (token: string) => {
  const chordRegex = new RegExp(
    this.CHORD_REGEX.source.replace(/\\b/g, ''),
  );
  return chordRegex.test(token);
};


  const extractChords = (line: string): string[] => {
    return line
      .replace(/[()]/g, '')      // quita paréntesis
      .split(/\s+/)
      .filter(isChord);
  };

const isChordLine = (line: string) => {
  const cleaned = line.replace(/[()]/g, '');
  const tokens = cleaned.trim().split(/\s+/);
  return tokens.length > 0 && tokens.every(isChord);
};

  const flushSectionIfNeeded = () => {
    if (currentSection.lines.length > 0) {
      sections.push(currentSection);
    }
    currentSection = { title: undefined, lines: [] };
    pendingChords = null;
  };

  for (let raw of lines) {
    const line = cleanLine(raw);

    // Ignorar páginas
    if (line.startsWith('Page')) {
      pendingChords = null;
      continue;
    }

    // Línea vacía
    if (!line) continue;

    // Nueva sección
    if (line.startsWith('[') && line.endsWith(']')) {
      flushSectionIfNeeded();
      currentSection = {
        title: line.replace(/\[|\]/g, ''),
        lines: []
      };
      continue;
    }

    // Línea de acordes
    if (isChordLine(raw)) {
        pendingChords = this.extractChordsWithPositions(raw);
    continue;
    }


    // Línea de letra
    currentSection.lines.push({
    text: line,
    chords: pendingChords ?? []
    });



    pendingChords = null;
  }

  // Si la sección termina solo con acordes (Intro, Instrumental)
  if (
    currentSection.lines.length === 0 &&
    pendingChords
  ) {
    currentSection.lines.push({
        text: '',
        chords: pendingChords.map(chord => ({
            chord,
            position: 0
        }))
        });
  }

  if (currentSection.lines.length > 0) {
    sections.push(currentSection);
  }

  return {
    id: Date.now(),
    title: data.title,
    artist: data.artist,
    key: data.key,
    sections
  };
}



saveSong(song: Song) {
  const songs = this.getLocalSongs();
  songs.push(song);
  localStorage.setItem('songs', JSON.stringify(songs));
}

getLocalSongs(): Song[] {
  const raw = localStorage.getItem('songs');
  return raw ? JSON.parse(raw) : [];
}

private normalizeSong(song: any): Song {
  // Si ya tiene sections, no tocar
  if (song.sections) {
    return song;
  }

  // Canción antigua → convertir
  return {
    ...song,
    sections: [
      {
        title: undefined,
        lines: song.lines || []
      }
    ]
  };
}

private extractChordsWithPositions(line: string): { chord: string; position: number }[] {
  const result: { chord: string; position: number }[] = [];

  let match: RegExpExecArray | null;

  while ((match = this.CHORD_REGEX.exec(line)) !== null) {
    result.push({
      chord: match[1],
      position: match.index
    });
  }

  return result;
}



}
