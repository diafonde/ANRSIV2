import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Slide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="slideshow-container">
      <div class="slides" [style.transform]="'translateX(-' + (currentSlide * 100) + '%)'">
        <div *ngFor="let slide of slides" class="slide">
          <img [src]="slide.imageUrl" [alt]="slide.title">
          <div class="slide-content">
            <h2>{{slide.title}}</h2>
            <p>{{slide.description}}</p>
            <a *ngIf="slide.link" [routerLink]="slide.link" class="slide-button">Learn More</a>
          </div>
        </div>
      </div>

      <button class="nav-button prev" (click)="prevSlide()">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="nav-button next" (click)="nextSlide()">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="slide-indicators">
        <button 
          *ngFor="let slide of slides; let i = index" 
          [class.active]="i === currentSlide"
          (click)="goToSlide(i)"
          class="indicator">
        </button>
      </div>
    </div>
  `,
  styles: [`
    .slideshow-container {
      position: relative;
      width: 100%;
      height: 500px;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(44, 94, 44, 0.15);
      margin: 2rem 0;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .slides {
      display: flex;
      width: 100%;
      height: 100%;
      transition: transform 0.5s ease-in-out;
    }

    .slide {
      min-width: 100%;
      position: relative;
    }

    .slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .slide-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      color: white;
    }

    .slide-content h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: white;
    }

    .slide-content p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      opacity: 0.9;
    }

    .slide-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #2c5e2c;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }

    .slide-button:hover {
      background-color: #1a3d1a;
    }

    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(44, 94, 44, 0.7);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
      padding: 8px;
    }

    .nav-button svg {
      width: 24px;
      height: 24px;
    }

    .nav-button:hover {
      background: rgba(44, 94, 44, 0.9);
    }

    .prev {
      left: 1rem;
    }

    .next {
      right: 1rem;
    }

    .slide-indicators {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
    }

    .indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid white;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }

    .indicator.active {
      background: white;
    }

    @media (max-width: 768px) {
      .slideshow-container {
        height: 300px;
      }

      .slide-content h2 {
        font-size: 1.5rem;
      }

      .slide-content p {
        font-size: 1rem;
      }

      .nav-button {
        width: 32px;
        height: 32px;
        padding: 6px;
      }

      .nav-button svg {
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class SlideshowComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      id: 1,
      title: 'Advancing Scientific Research',
      description: 'Discover the latest breakthroughs in scientific research and innovation',
      imageUrl: 'assets/images/slideshow/research.jpg',
      link: '/news'
    },
    {
      id: 2,
      title: 'Innovation Hub',
      description: 'Explore our state-of-the-art facilities and research centers',
      imageUrl: 'assets/images/slideshow/innovation.jpg',
      link: '/about'
    },
    {
      id: 3,
      title: 'Research Grants',
      description: 'Learn about funding opportunities for your research projects',
      imageUrl: 'assets/images/slideshow/grants.jpg',
      link: '/news?category=grants'
    }
  ];

  currentSlide = 0;
  private autoPlayInterval: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
} 