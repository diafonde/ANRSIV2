import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  date: Date;
  author: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'api/news'; // Replace with actual API endpoint

  constructor(private http: HttpClient) { }

  getFeaturedArticles(): Observable<NewsArticle[]> {
    // TODO: Replace with actual API call
    return of([
      {
        id: 1,
        title: 'Breakthrough in Quantum Computing Research',
        summary: 'Scientists achieve major milestone in quantum computing with new error correction method.',
        content: 'Full article content here...',
        imageUrl: '/assets/images/quantum-computing.jpg',
        category: 'Research',
        date: new Date('2024-03-15'),
        author: 'Dr. Jane Smith',
        tags: ['quantum computing', 'research', 'technology']
      },
      {
        id: 2,
        title: 'New Renewable Energy Initiative Launched',
        summary: 'Government announces major funding for renewable energy research and development.',
        content: 'Full article content here...',
        imageUrl: '/assets/images/renewable-energy.jpg',
        category: 'Innovation',
        date: new Date('2024-03-14'),
        author: 'John Doe',
        tags: ['renewable energy', 'innovation', 'sustainability']
      },
      {
        id: 3,
        title: 'International Science Conference Announced',
        summary: 'Leading scientists to gather for annual conference on climate change solutions.',
        content: 'Full article content here...',
        imageUrl: '/assets/images/conference.jpg',
        category: 'Events',
        date: new Date('2024-03-13'),
        author: 'Dr. Michael Johnson',
        tags: ['conference', 'climate change', 'events']
      }
    ]);
  }

  getArticleById(id: number): Observable<NewsArticle | undefined> {
    // TODO: Replace with actual API call
    return this.getFeaturedArticles().pipe(
      map(articles => articles.find(article => article.id === id))
    );
  }

  getArticlesByCategory(category: string): Observable<NewsArticle[]> {
    // TODO: Replace with actual API call
    return this.getFeaturedArticles().pipe(
      map(articles => articles.filter(article => article.category.toLowerCase() === category.toLowerCase()))
    );
  }

  searchArticles(query: string): Observable<NewsArticle[]> {
    // TODO: Replace with actual API call
    return this.getFeaturedArticles().pipe(
      map(articles => articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.summary.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ))
    );
  }
} 