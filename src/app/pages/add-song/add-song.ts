import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Song } from '../../models/song.model';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-song.html',
  styleUrls: ['./add-song.css']
})
export class AddSongComponent {

  title = '';
  artist = '';
  key = '';
  rawText = '';

  constructor(
    private songsService: SongsService,
    private router: Router
  ) {}

  save() {
    const song = this.songsService.parseAndCreateSong({
      title: this.title,
      artist: this.artist,
      key: this.key,
      rawText: this.rawText
    });

    this.songsService.saveSong(song);
    this.router.navigate(['/']);
  }
}

