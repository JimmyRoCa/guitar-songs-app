import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SongsService } from '../../services/songs.service';
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
  songs$: Observable<Song[]>;

  constructor(private songsService: SongsService) {

    this.songs$ = combineLatest<[Song[], string]>([
      this.songsService.getSongs(),
      this.search$
    ]).pipe(
      map(([songs, search]) =>
        songs.filter(song =>
          song.title.toLowerCase().includes(search) ||
          song.artist.toLowerCase().includes(search)
        )
      )
    );
  }

  onSearch(value: string) {
    this.search$.next(value.toLowerCase());
  }
}
