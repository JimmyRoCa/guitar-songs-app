import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertSong } from './convert-song';

describe('ConvertSong', () => {
  let component: ConvertSong;
  let fixture: ComponentFixture<ConvertSong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertSong]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertSong);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
