import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-song-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './song-detail.html',
  styleUrls: ['./song-detail.css']
})
export class SongDetailComponent {

  song$: Observable<Song | undefined>;

  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  transposeSteps = 0;

  transposeChord(chord: string): string {
  if (!chord) return chord;

  const match = chord.match(/^([A-G]#?)(.*)$/);
  if (!match) return chord;

  const [, root, suffix] = match;
  const index = this.notes.indexOf(root);
  if (index === -1) return chord;

  const newIndex =
    (index + this.transposeSteps + this.notes.length) % this.notes.length;

  return this.notes[newIndex] + suffix;
}

isStageMode = false;
isDarkMode = false;

ngOnInit() {
  this.isDarkMode = document.body.classList.contains('dark-mode');
}


toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;
  document.body.classList.toggle('dark-mode', this.isDarkMode);
}


isAutoScroll = false;
scrollInterval: any = null;
private scrollAccumulator = 0;
scrollSpeed = 0.2; // píxeles por tick

toggleAutoScroll() {
  if (this.isAutoScroll) {
    clearInterval(this.scrollInterval);
    this.scrollInterval = null;
    this.scrollAccumulator = 0;
    this.isAutoScroll = false;
  } else {
    this.isAutoScroll = true;

    this.scrollInterval = setInterval(() => {
      this.scrollAccumulator += this.scrollSpeed;

      if (this.scrollAccumulator >= 1) {
        const pixels = Math.floor(this.scrollAccumulator);
        window.scrollBy(0, pixels);
        this.scrollAccumulator -= pixels;
      }
    }, 30);
  }
}


increaseSpeed() {
  this.scrollSpeed += 0.2;
}

decreaseSpeed() {
  if (this.scrollSpeed > 0.2) {
    this.scrollSpeed -= 0.2;
  }
}

decreaseTranspose() {
  this.transposeSteps--;
}

increaseTranspose() {
  this.transposeSteps++;
}

  constructor(
    private route: ActivatedRoute,
    private songsService: SongsService
  ) {
    this.song$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.songsService.getSongById(id);
      })
    );
  }
}
