import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Photo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: Date;
}

@Component({
  selector: 'app-photos',
  template: `
    <div class="photos-container">
      <h1>{{ 'media.photos.title' | translate }}</h1>
      
      <div class="filters">
        <button 
          *ngFor="let category of categories" 
          [class.active]="selectedCategory === category"
          (click)="filterByCategory(category)"
          class="filter-btn">
          {{ 'media.photos.categories.' + category.toLowerCase() | translate }}
        </button>
      </div>

      <div class="photos-grid">
        <div *ngFor="let photo of filteredPhotos" class="photo-card">
          <div class="photo-image">
            <img [src]="photo.imageUrl" [alt]="photo.title">
          </div>
          <div class="photo-info">
            <h3>{{photo.title}}</h3>
            <p>{{photo.description}}</p>
            <div class="photo-meta">
              <span class="category">{{ 'media.photos.categories.' + photo.category.toLowerCase() | translate }}</span>
              <span class="date">{{photo.date | date}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .photos-container {
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

    .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    .photo-card {
      background: #393E46;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      border: 1px solid #948979;
    }

    .photo-card:hover {
      transform: translateY(-5px);
    }

    .photo-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .photo-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .photo-card:hover .photo-image img {
      transform: scale(1.05);
    }

    .photo-info {
      padding: 1.5rem;
    }

    .photo-info h3 {
      color: #DFD0B8;
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }

    .photo-info p {
      color: #DFD0B8;
      opacity: 0.8;
      margin: 0 0 1rem 0;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .photo-meta {
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
      .photos-container {
        padding: 1rem;
      }

      .photos-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PhotosComponent implements OnInit {
  photos: Photo[] = [
    {
      id: 1,
      title: 'Research Laboratory',
      description: 'State-of-the-art research facilities at our main campus',
      imageUrl: '/assets/images/lab.jpg',
      category: 'Facilities',
      date: new Date('2024-03-15')
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Our research team discussing breakthrough innovations',
      imageUrl: '/assets/images/team.jpg',
      category: 'Team',
      date: new Date('2024-03-14')
    },
    {
      id: 3,
      title: 'Conference Hall',
      description: 'Modern conference facilities for scientific gatherings',
      imageUrl: '/assets/images/conference.jpg',
      category: 'Facilities',
      date: new Date('2024-03-13')
    },
    {
      id: 4,
      title: 'Research Equipment',
      description: 'Advanced scientific equipment in our laboratories',
      imageUrl: '/assets/images/equipment.jpg',
      category: 'Equipment',
      date: new Date('2024-03-12')
    }
  ];

  categories: string[] = ['All', 'Facilities', 'Team', 'Equipment', 'Events'];
  selectedCategory: string = 'All';
  filteredPhotos: Photo[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.filteredPhotos = this.photos;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredPhotos = this.photos;
    } else {
      this.filteredPhotos = this.photos.filter(photo => photo.category === category);
    }
  }
} 