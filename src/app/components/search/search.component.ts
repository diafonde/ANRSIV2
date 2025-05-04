import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, NewsArticle } from '../../services/news.service';

@Component({
  selector: 'app-search',
  template: `
    <div class="search-container">
      <div class="search-header">
        <h1>Search Articles</h1>
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (input)="onSearch()"
            placeholder="Search for articles...">
        </div>
      </div>

      <div class="search-filters">
        <div class="filter-group">
          <label>Category</label>
          <select [(ngModel)]="selectedCategory" (change)="onSearch()">
            <option value="">All Categories</option>
            <option *ngFor="let category of categories" [value]="category">
              {{category}}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label>Date Range</label>
          <select [(ngModel)]="dateRange" (change)="onSearch()">
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Sort By</label>
          <select [(ngModel)]="sortBy" (change)="onSearch()">
            <option value="date">Date</option>
            <option value="relevance">Relevance</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      <div class="search-results" *ngIf="searchResults.length > 0">
        <h2>Found {{searchResults.length}} results</h2>
        <div class="results-grid">
          <article *ngFor="let article of searchResults" class="result-card">
            <div class="result-image">
              <img [src]="article.imageUrl" [alt]="article.title">
            </div>
            <div class="result-content">
              <span class="category">{{article.category}}</span>
              <h3>{{article.title}}</h3>
              <p>{{article.summary}}</p>
              <div class="result-meta">
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
      </div>

      <div class="no-results" *ngIf="searchQuery && searchResults.length === 0">
        <h2>No results found</h2>
        <p>Try adjusting your search criteria or browse our categories</p>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .search-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .search-header h1 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }
    .search-box {
      max-width: 600px;
      margin: 0 auto;
    }
    .search-box input {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      transition: border-color 0.3s ease;
    }
    .search-box input:focus {
      border-color: #3498db;
      outline: none;
    }
    .search-filters {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .filter-group {
      flex: 1;
      min-width: 200px;
    }
    .filter-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }
    .filter-group select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
    }
    .search-results h2 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }
    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .result-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .result-card:hover {
      transform: translateY(-5px);
    }
    .result-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .result-content {
      padding: 1.5rem;
    }
    .category {
      background: #3498db;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    .result-content h3 {
      margin: 1rem 0;
      color: #2c3e50;
    }
    .result-meta {
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
    .no-results {
      text-align: center;
      padding: 3rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .no-results h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    .no-results p {
      color: #666;
    }
  `]
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = '';
  dateRange: string = 'all';
  sortBy: string = 'date';
  searchResults: NewsArticle[] = [];
  categories: string[] = ['Research', 'Innovation', 'Events', 'Grants'];

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.onSearch();
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.searchResults = [];
      return;
    }

    this.newsService.searchArticles(this.searchQuery).subscribe(articles => {
      let filtered = articles;

      // Apply category filter
      if (this.selectedCategory) {
        filtered = filtered.filter(article => 
          article.category.toLowerCase() === this.selectedCategory.toLowerCase()
        );
      }

      // Apply date range filter
      const now = new Date();
      switch (this.dateRange) {
        case 'week':
          filtered = filtered.filter(article => 
            (now.getTime() - article.date.getTime()) <= 7 * 24 * 60 * 60 * 1000
          );
          break;
        case 'month':
          filtered = filtered.filter(article => 
            (now.getTime() - article.date.getTime()) <= 30 * 24 * 60 * 60 * 1000
          );
          break;
        case 'year':
          filtered = filtered.filter(article => 
            (now.getTime() - article.date.getTime()) <= 365 * 24 * 60 * 60 * 1000
          );
          break;
      }

      // Apply sorting
      switch (this.sortBy) {
        case 'date':
          filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
          break;
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'relevance':
          // TODO: Implement relevance-based sorting
          break;
      }

      this.searchResults = filtered;
    });
  }
} 