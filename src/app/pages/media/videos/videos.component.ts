import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  duration: string;
  date: Date;
}

@Component({
  selector: 'app-videos',
  template: `
    <div class="videos-container">
      <h1>{{ 'media.videos.title' | translate }}</h1>
      
      <div class="filters">
        <button 
          *ngFor="let category of categories" 
          [class.active]="selectedCategory === category"
          (click)="filterByCategory(category)"
          class="filter-btn">
          {{ 'media.videos.categories.' + category.toLowerCase() | translate }}
        </button>
      </div>

      <div class="videos-grid">
        <div *ngFor="let video of filteredVideos" class="video-card">
          <div class="video-thumbnail">
            <img [src]="video.thumbnailUrl" [alt]="video.title">
            <div class="duration">{{video.duration}}</div>
            <div class="play-button">
              <i class="fas fa-play"></i>
            </div>
          </div>
          <div class="video-info">
            <h3>{{video.title}}</h3>
            <p>{{video.description}}</p>
            <div class="video-meta">
              <span class="category">{{ 'media.videos.categories.' + video.category.toLowerCase() | translate }}</span>
              <span class="date">{{video.date | date}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .videos-container {
      padding: 2rem;
      background: #222831;
      min-height: 100vh;
    }

    h1 {
      color: #DFD0B8;
      margin-bottom: 2rem;
      font-size: 2rem;
      text-align: center;
    }

    .filters {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      background: #393E46;
      color: #DFD0B8;
      border: 1px solid #948979;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-btn:hover {
      background: #948979;
    }

    .filter-btn.active {
      background: #948979;
    }

    .videos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    .video-card {
      background: #393E46;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      border: 1px solid #948979;
    }

    .video-card:hover {
      transform: translateY(-5px);
    }

    .video-thumbnail {
      width: 100%;
      height: 200px;
      position: relative;
      overflow: hidden;
    }

    .video-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .video-card:hover .video-thumbnail img {
      transform: scale(1.05);
    }

    .duration {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #DFD0B8;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background: rgba(148, 137, 121, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.3s ease;
    }

    .video-card:hover .play-button {
      opacity: 1;
    }

    .play-button i {
      color: #DFD0B8;
      font-size: 1.5rem;
    }

    .video-info {
      padding: 1.5rem;
    }

    .video-info h3 {
      color: #DFD0B8;
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }

    .video-info p {
      color: #DFD0B8;
      opacity: 0.8;
      margin: 0 0 1rem 0;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .video-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .category {
      background: #948979;
      color: #DFD0B8;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .date {
      color: #DFD0B8;
      opacity: 0.6;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .videos-container {
        padding: 1rem;
      }

      .videos-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class VideosComponent implements OnInit {
  videos: Video[] = [
    {
      id: 1,
      title: 'Research Overview',
      description: 'An overview of our latest research projects and innovations',
      thumbnailUrl: '/assets/images/video1.jpg',
      videoUrl: '/assets/videos/research-overview.mp4',
      category: 'Research',
      duration: '5:30',
      date: new Date('2024-03-15')
    },
    {
      id: 2,
      title: 'Team Interview',
      description: 'Interview with our leading researchers about their work',
      thumbnailUrl: '/assets/images/video2.jpg',
      videoUrl: '/assets/videos/team-interview.mp4',
      category: 'Team',
      duration: '8:45',
      date: new Date('2024-03-14')
    },
    {
      id: 3,
      title: 'Facility Tour',
      description: 'Virtual tour of our state-of-the-art research facilities',
      thumbnailUrl: '/assets/images/video3.jpg',
      videoUrl: '/assets/videos/facility-tour.mp4',
      category: 'Facilities',
      duration: '12:20',
      date: new Date('2024-03-13')
    },
    {
      id: 4,
      title: 'Conference Highlights',
      description: 'Highlights from our annual research conference',
      thumbnailUrl: '/assets/images/video4.jpg',
      videoUrl: '/assets/videos/conference-highlights.mp4',
      category: 'Events',
      duration: '15:00',
      date: new Date('2024-03-12')
    }
  ];

  categories: string[] = ['All', 'Research', 'Team', 'Facilities', 'Events'];
  selectedCategory: string = 'All';
  filteredVideos: Video[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.filteredVideos = this.videos;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredVideos = this.videos;
    } else {
      this.filteredVideos = this.videos.filter(video => video.category === category);
    }
  }
} 