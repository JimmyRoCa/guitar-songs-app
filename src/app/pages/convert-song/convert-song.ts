import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-convert-song',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './convert-song.html',
  styleUrls: ['./convert-song.css']
})
export class ConvertSongComponent {

  title = '';
  artist = '';
  key = '';
  rawText = '';

  resultJson: string | null = null;

  constructor(private songsService: SongsService) {}

  convert() {
    const song = this.songsService.parseAndCreateSong({
      title: this.title || 'Untitled',
      artist: this.artist || 'Unknown',
      key: this.key || '',
      rawText: this.rawText
    });

    this.resultJson = JSON.stringify(song, null, 2);
  }

  copyJson() {
  if (!this.resultJson) return;

  navigator.clipboard.writeText(this.resultJson)
    .then(() => {
      alert('JSON copiado al portapapeles');
    })
    .catch(() => {
      alert('No se pudo copiar el JSON');
    });
}

}
