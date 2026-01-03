import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSong } from './add-song';

describe('AddSong', () => {
  let component: AddSong;
  let fixture: ComponentFixture<AddSong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSong]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSong);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
