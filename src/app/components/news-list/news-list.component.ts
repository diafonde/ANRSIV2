import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, NewsArticle } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  template: `
    <div class="news-list-container">
      <div class="filters">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (input)="onSearch()"
            placeholder="Search articles...">
        </div>
        <div class="category-filters">
          <button 
            *ngFor="let category of categories" 
            [class.active]="selectedCategory === category"
            (click)="filterByCategory(category)">
            {{category}}
          </button>
        </div>
      </div>

      <div class="news-grid">
        <article *ngFor="let article of filteredArticles" class="news-card">
          <div class="news-image">
            <img [src]="article.imageUrl" [alt]="article.title">
          </div>
          <div class="news-content">
            <span class="category">{{article.category}}</span>
            <h3>{{article.title}}</h3>
            <p>{{article.summary}}</p>
            <div class="news-meta">
              <span class="author">By {{article.author}}</span>
              <span class="date">{{article.date | date}}</span>
              <a [routerLink]="['/news', article.id]" class="read-more">Read More</a>
            </div>
            <div class="tags">
              <span *ngFor="let tag of article.tags" class="tag">{{tag}}</span>
            </div>
          </div>
        </article>
      </div>

      <div class="pagination" *ngIf="totalPages > 1">
        <button 
          [disabled]="currentPage === 1"
          (click)="changePage(currentPage - 1)">
          Previous
        </button>
        <span>Page {{currentPage}} of {{totalPages}}</span>
        <button 
          [disabled]="currentPage === totalPages"
          (click)="changePage(currentPage + 1)">
          Next
        </button>
      </div>
    </div>
  `,
  styles: [`
    .news-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .filters {
      margin-bottom: 2rem;
    }
    .search-box {
      margin-bottom: 1rem;
    }
    .search-box input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .category-filters {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .category-filters button {
      padding: 0.5rem 1rem;
      border: 1px solid #3498db;
      background: white;
      color: #3498db;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .category-filters button.active {
      background: #3498db;
      color: white;
    }
    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .news-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .news-card:hover {
      transform: translateY(-5px);
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
      background: #3498db;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    .news-content h3 {
      margin: 1rem 0;
      color: #2c3e50;
    }
    .news-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
      color: #666;
      font-size: 0.9rem;
    }
    .read-more {
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .tag {
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
      color: #666;
    }
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
    }
    .pagination button {
      padding: 0.5rem 1rem;
      border: 1px solid #3498db;
      background: white;
      color: #3498db;
      border-radius: 4px;
      cursor: pointer;
    }
    .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .pagination span {
      color: #666;
    }
  `]
})
export class NewsListComponent implements OnInit {
  articles: NewsArticle[] = [];
  filteredArticles: NewsArticle[] = [];
  categories: string[] = ['All', 'Research', 'Innovation', 'Events', 'Grants'];
  selectedCategory: string = 'All';
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadArticles();
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.filterArticles();
      }
    });
  }

  loadArticles(): void {
    this.newsService.getFeaturedArticles().subscribe(articles => {
      this.articles = articles;
      this.filterArticles();
    });
  }

  filterArticles(): void {
    let filtered = this.articles;

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(article => 
        article.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredArticles = filtered.slice(start, start + this.itemsPerPage);
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.filterArticles();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filterArticles();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.filterArticles();
  }
} 