import { Routes } from '@angular/router';
import { SongListComponent } from './pages/song-list/song-list';
import { SongDetailComponent } from './pages/song-detail/song-detail';
import { AddSongComponent } from './pages/add-song/add-song';
import { ConvertSongComponent } from './pages/convert-song/convert-song';

export const routes: Routes = [
  { path: '', component: SongListComponent },
  { path: 'song/:id', component: SongDetailComponent },
  { path: 'add', component: AddSongComponent },
  { path: 'convert', component: ConvertSongComponent}

];

