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
  styles: [`
    :host {
      display: block;
      background: #C8E1FE;
      color: #222831;
      margin: 0;
      padding: 0;
    }
    .main-content {
      display: flex;
      gap: 1.5rem;
      margin: 0;
      padding: 0 2rem;
    }
    .featured-news {
      flex: 3;
    }
    .side-content {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .section-divider {
      height: 1px;
      background: #41BE5C;
      margin: 1rem 0;
    }
    .featured-news h2, .categories h2, .latest-updates h2 {
      margin-bottom: 2rem;
      color: #222831;
      font-size: 1.8rem;
      font-weight: 600;
    }
    .news-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .news-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid #41BE5C;
    }
    .news-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(65, 190, 92, 0.2);
    }
    .news-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .news-content {
      padding: 1.5rem;
    }
    .category {
      background: #41BE5C;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    .news-content h3 {
      margin: 1rem 0;
      color: #222831;
      font-size: 1.4rem;
    }
    .news-content p {
      color: #222831;
      line-height: 1.6;
      opacity: 0.8;
    }
    .news-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      color: #222831;
      opacity: 0.7;
    }
    .read-more {
      color: #41BE5C;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    .read-more:hover {
      color: #BE41A3;
    }
    .category-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .category-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      color: #222831;
      transition: all 0.3s ease;
      border: 1px solid #41BE5C;
    }
    .category-card:hover {
      background: #41BE5C;
      color: white;
      transform: translateY(-2px);
    }
    .category-card h3 {
      margin-bottom: 1rem;
      color: inherit;
      font-size: 1.2rem;
    }
    .category-card p {
      color: inherit;
      margin: 0;
      opacity: 0.8;
    }
    .updates-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .update-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 12px;
      border: 1px solid #41BE5C;
      transition: transform 0.3s ease;
    }
    .update-item:hover {
      transform: translateX(5px);
      border-color: #BE41A3;
    }
    .update-icon {
      color: #41BE5C;
      font-size: 1.2rem;
    }
    .update-content {
      flex: 1;
    }
    .update-content h4 {
      margin: 0 0 0.5rem 0;
      color: #222831;
    }
    .update-content p {
      margin: 0;
      color: #222831;
      font-size: 0.9rem;
      opacity: 0.8;
    }
    .update-time {
      display: block;
      margin-top: 0.5rem;
      color: #222831;
      font-size: 0.8rem;
      opacity: 0.6;
    }

    @media (max-width: 1200px) {
      .main-content {
        flex-direction: column;
      }
      .featured-news, .side-content {
        flex: none;
      }
    }
  `]
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