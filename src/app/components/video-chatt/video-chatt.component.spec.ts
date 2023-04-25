import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoChattComponent } from './video-chatt.component';

describe('VideoChattComponent', () => {
  let component: VideoChattComponent;
  let fixture: ComponentFixture<VideoChattComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoChattComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoChattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
