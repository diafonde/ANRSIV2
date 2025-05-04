import { Component, OnInit } from '@angular/core';
import { SlideshowComponent } from '../slideshow/slideshow.component';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  date: Date;
}

@Component({
  selector: 'app-home',
  template: `
    <app-slideshow></app-slideshow>

    <div class="main-content">
      <section class="featured-news">
        <h2>Featured Articles</h2>
        <div class="news-grid">
          <article *ngFor="let article of featuredArticles" class="news-card">
            <div class="news-image">
              <img [src]="article.imageUrl" [alt]="article.title">
            </div>
            <div class="news-content">
              <span class="category">{{article.category}}</span>
              <h3>{{article.title}}</h3>
              <p>{{article.summary}}</p>
              <div class="news-meta">
                <span class="date">{{article.date | date}}</span>
                <a [routerLink]="['/news', article.id]" class="read-more">Read More</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="side-content">
        <div class="categories">
          <h2>Explore by Category</h2>
          <div class="category-grid">
            <a routerLink="/news" [queryParams]="{category: 'research'}" class="category-card">
              <h3>Research</h3>
              <p>Latest scientific discoveries and research findings</p>
            </a>
            <a routerLink="/news" [queryParams]="{category: 'innovation'}" class="category-card">
              <h3>Innovation</h3>
              <p>Cutting-edge technological advancements</p>
            </a>
            <a routerLink="/news" [queryParams]="{category: 'events'}" class="category-card">
              <h3>Events</h3>
              <p>Upcoming conferences and scientific gatherings</p>
            </a>
            <a routerLink="/news" [queryParams]="{category: 'grants'}" class="category-card">
              <h3>Grants</h3>
              <p>Funding opportunities and research grants</p>
            </a>
          </div>
        </div>

        <div class="section-divider"></div>

        <div class="latest-updates">
          <h2>Latest Updates</h2>
          <div class="updates-list">
            <div *ngFor="let update of latestUpdates" class="update-item">
              <div class="update-icon">
                <i class="fas fa-bell"></i>
              </div>
              <div class="update-content">
                <h4>{{update.title}}</h4>
                <p>{{update.description}}</p>
                <span class="update-time">{{update.time}}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredArticles: NewsArticle[] = [
    {
      id: 1,
      title: 'Breakthrough in Quantum Computing Research',
      summary: 'Scientists achieve major milestone in quantum computing with new error correction method.',
      imageUrl: '/assets/images/quantum-computing.jpg',
      category: 'Research',
      date: new Date('2024-03-15')
    },
    {
      id: 2,
      title: 'New Renewable Energy Initiative Launched',
      summary: 'Government announces major funding for renewable energy research and development.',
      imageUrl: '/assets/images/renewable-energy.jpg',
      category: 'Innovation',
      date: new Date('2024-03-14')
    },
    {
      id: 3,
      title: 'International Science Conference Announced',
      summary: 'Leading scientists to gather for annual conference on climate change solutions.',
      imageUrl: '/assets/images/conference.jpg',
      category: 'Events',
      date: new Date('2024-03-13')
    }
  ];

  latestUpdates = [
    {
      title: 'New Research Grant Available',
      description: 'Applications now open for the 2024 Science Innovation Fund',
      time: '2 hours ago'
    },
    {
      title: 'System Maintenance',
      description: 'Scheduled maintenance this weekend',
      time: '5 hours ago'
    },
    {
      title: 'New Publication',
      description: 'Latest research findings published in Nature',
      time: '1 day ago'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // TODO: Fetch featured articles from API
  }
} 