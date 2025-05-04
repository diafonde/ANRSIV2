import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faHome, faNewspaper, faClock, faFlask, faLightbulb, faCalendarAlt, faInfoCircle, faBullseye, faUsers, faHandshake, faBriefcase, faPhotoVideo, faVideo, faCamera, faImages, faEnvelope, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="header-content">
        <a routerLink="/" class="logo">
          <img src="assets/images/logo.png" alt="ANRSI Logo">
          <h1>ANRSI</h1>
        </a>
        <nav class="nav-links" [class.active]="isMenuOpen">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Home</a>
          <a routerLink="/about" routerLinkActive="active" class="nav-link">About</a>
          <a routerLink="/news" routerLinkActive="active" class="nav-link">News</a>
          <a routerLink="/research" routerLinkActive="active" class="nav-link">Research</a>
          <a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a>
          <div class="language-selector">
            <select (change)="onLanguageChange($event)">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </nav>
        <button class="mobile-menu-btn" (click)="toggleMenu()">
          <i class="fas" [class.fa-bars]="!isMenuOpen" [class.fa-times]="isMenuOpen"></i>
        </button>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  @Output() languageChange = new EventEmitter<string>();
  currentLang: string = 'fr';
  showLanguageMenu: boolean = false;

  // Font Awesome icons
  faHome = faHome;
  faNewspaper = faNewspaper;
  faClock = faClock;
  faFlask = faFlask;
  faLightbulb = faLightbulb;
  faCalendarAlt = faCalendarAlt;
  faInfoCircle = faInfoCircle;
  faBullseye = faBullseye;
  faUsers = faUsers;
  faHandshake = faHandshake;
  faBriefcase = faBriefcase;
  faPhotoVideo = faPhotoVideo;
  faVideo = faVideo;
  faCamera = faCamera;
  faImages = faImages;
  faEnvelope = faEnvelope;
  faChevronDown = faChevronDown;

  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.languageChange.emit(select.value);
  }

  getCurrentLangLabel(): string {
    switch (this.currentLang) {
      case 'fr':
        return 'FR';
      case 'ar':
        return 'عربي';
      default:
        return 'FR';
    }
  }
} 