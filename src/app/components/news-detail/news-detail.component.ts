import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, NewsArticle } from '../../services/news.service';

@Component({
  selector: 'app-news-detail',
  template: `
    <div class="article-container" *ngIf="article">
      <article class="article">
        <header class="article-header">
          <span class="category">{{article.category}}</span>
          <h1>{{article.title}}</h1>
          <div class="article-meta">
            <span class="author">By {{article.author}}</span>
            <span class="date">{{article.date | date}}</span>
          </div>
        </header>

        <div class="article-image">
          <img [src]="article.imageUrl" [alt]="article.title">
        </div>

        <div class="article-content">
          <p>{{article.content}}</p>
        </div>

        <div class="article-tags">
          <span *ngFor="let tag of article.tags" class="tag">{{tag}}</span>
        </div>

        <div class="article-share">
          <h3>Share this article</h3>
          <div class="share-buttons">
            <button (click)="shareOnTwitter()">Twitter</button>
            <button (click)="shareOnLinkedIn()">LinkedIn</button>
            <button (click)="shareOnFacebook()">Facebook</button>
          </div>
        </div>
      </article>

      <aside class="related-articles" *ngIf="relatedArticles.length > 0">
        <h2>Related Articles</h2>
        <div class="related-grid">
          <article *ngFor="let related of relatedArticles" class="related-card">
            <div class="related-image">
              <img [src]="related.imageUrl" [alt]="related.title">
            </div>
            <div class="related-content">
              <h3>{{related.title}}</h3>
              <p>{{related.summary}}</p>
              <a [routerLink]="['/news', related.id]" class="read-more">Read More</a>
            </div>
          </article>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    .article-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }
    .article {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .article-header {
      padding: 2rem;
    }
    .category {
      background: #3498db;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    .article-header h1 {
      margin: 1rem 0;
      color: #2c3e50;
      font-size: 2rem;
    }
    .article-meta {
      display: flex;
      gap: 1rem;
      color: #666;
      font-size: 0.9rem;
    }
    .article-image img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
    .article-content {
      padding: 2rem;
      line-height: 1.6;
      color: #333;
    }
    .article-tags {
      padding: 0 2rem 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .tag {
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
      color: #666;
    }
    .article-share {
      padding: 2rem;
      border-top: 1px solid #eee;
    }
    .article-share h3 {
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    .share-buttons {
      display: flex;
      gap: 1rem;
    }
    .share-buttons button {
      padding: 0.5rem 1rem;
      border: 1px solid #3498db;
      background: white;
      color: #3498db;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .share-buttons button:hover {
      background: #3498db;
      color: white;
    }
    .related-articles {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .related-articles h2 {
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }
    .related-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .related-card {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 1rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eee;
    }
    .related-card:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .related-image img {
      width: 100%;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }
    .related-content h3 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      color: #2c3e50;
    }
    .related-content p {
      font-size: 0.9rem;
      color: #666;
      margin: 0 0 0.5rem;
    }
    .read-more {
      color: #3498db;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
    }
    @media (max-width: 768px) {
      .article-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class NewsDetailComponent implements OnInit {
  article: NewsArticle | undefined;
  relatedArticles: NewsArticle[] = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadArticle(id);
    });
  }

  loadArticle(id: number): void {
    this.newsService.getArticleById(id).subscribe(article => {
      this.article = article;
      if (article) {
        this.loadRelatedArticles(article);
      }
    });
  }

  loadRelatedArticles(article: NewsArticle): void {
    this.newsService.getFeaturedArticles().subscribe(articles => {
      this.relatedArticles = articles
        .filter(a => a.id !== article.id && a.category === article.category)
        .slice(0, 3);
    });
  }

  shareOnTwitter(): void {
    if (this.article) {
      const text = encodeURIComponent(this.article.title);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
  }

  shareOnLinkedIn(): void {
    if (this.article) {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  }

  shareOnFacebook(): void {
    if (this.article) {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  }
} 