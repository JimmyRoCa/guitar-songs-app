import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SongsService } from '../../services/songs.service';
import { ThemeService } from '../../services/theme.service';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './song-list.html',
  styleUrls: ['./song-list.css']
})
export class SongListComponent {

  private search$ = new BehaviorSubject<string>('');
  private sort$ = new BehaviorSubject<'title' | 'artist'>('title');
  songs$: Observable<Song[]>;

  constructor(private songsService: SongsService,
    private themeService: ThemeService
  ) {

    this.songs$ = combineLatest<[Song[], string, 'title' | 'artist']>([
      this.songsService.getSongs(),
      this.search$,
      this.sort$
    ]).pipe(
      map(([songs, search, sort]) =>
        [...songs]
          .filter(song =>
            song.title.toLowerCase().includes(search) ||
            song.artist.toLowerCase().includes(search)
          )
          .sort((a, b) =>
            a[sort].localeCompare(b[sort])
          )
      )
    );
  }

  onSearch(value: string) {
    this.search$.next(value.toLowerCase());
  }

  setSort(mode: 'title' | 'artist') {
    this.sort$.next(mode);
  }

toggleDarkMode() {
  this.themeService.toggleDarkMode();
}  

get isDarkMode() {
  return this.themeService.isDarkMode();
}

}
