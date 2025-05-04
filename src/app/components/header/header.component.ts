import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faHome, faNewspaper, faClock, faFlask, faLightbulb, faCalendarAlt, faInfoCircle, faBullseye, faUsers, faHandshake, faBriefcase, faPhotoVideo, faVideo, faCamera, faImages, faEnvelope, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="main-header">
        <div class="header-container">
          <div class="logo">
            <a routerLink="/">
              <div class="logo-icon">
                <img src="assets/images/logoo.png" alt="ANRSI Logo">
              </div>
              <div class="logo-text">
                <h1>{{ 'ANRSI' | translate }}</h1>
                <h3>{{ 'National Agency for Scientific Research and Innovation' | translate }}</h3>
              </div>
            </a>
          </div>

          <div class="search-box">
            <form (ngSubmit)="onSearch()">
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                name="searchQuery"
                [placeholder]="'header.searchPlaceholder' | translate"
                (keyup.enter)="onSearch()"
              >
              <button type="submit">
                {{ 'header.search' | translate }}
              </button>
            </form>
          </div>

          <div class="language-switcher">
            <button (click)="toggleLanguageMenu()" class="lang-btn">
              {{ getCurrentLangLabel() }}
              <fa-icon [icon]="faChevronDown"></fa-icon>
            </button>
            <div class="language-dropdown" [class.show]="showLanguageMenu">
              <button (click)="switchLanguage('fr')" [class.active]="currentLang === 'fr'">
                <span class="lang-code">FR</span>
                <span class="lang-name">Français</span>
              </button>
              <button (click)="switchLanguage('ar')" [class.active]="currentLang === 'ar'">
                <span class="lang-code">عربي</span>
                <span class="lang-name">العربية</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav class="main-nav">
        <div class="nav-container">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              <fa-icon [icon]="faHome"></fa-icon> {{ 'header.nav.home' | translate }}
            </a></li>
            <li class="has-dropdown">
              <a routerLink="/news" routerLinkActive="active">
                <fa-icon [icon]="faNewspaper"></fa-icon> {{ 'header.nav.news' | translate }}
              </a>
              <div class="dropdown-menu">
                <a routerLink="/news/latest"><fa-icon [icon]="faClock"></fa-icon> {{ 'header.nav.latest' | translate }}</a>
                <a routerLink="/news/research"><fa-icon [icon]="faFlask"></fa-icon> {{ 'header.nav.research' | translate }}</a>
                <a routerLink="/news/innovation"><fa-icon [icon]="faLightbulb"></fa-icon> {{ 'header.nav.innovation' | translate }}</a>
                <a routerLink="/news/events"><fa-icon [icon]="faCalendarAlt"></fa-icon> {{ 'header.nav.events' | translate }}</a>
              </div>
            </li>
            <li class="has-dropdown">
              <a routerLink="/about" routerLinkActive="active">
                <fa-icon [icon]="faInfoCircle"></fa-icon> {{ 'header.nav.about' | translate }}
              </a>
              <div class="dropdown-menu">
                <a routerLink="/about/mission"><fa-icon [icon]="faBullseye"></fa-icon> {{ 'header.nav.mission' | translate }}</a>
                <a routerLink="/about/team"><fa-icon [icon]="faUsers"></fa-icon> {{ 'header.nav.team' | translate }}</a>
                <a routerLink="/about/partners"><fa-icon [icon]="faHandshake"></fa-icon> {{ 'header.nav.partners' | translate }}</a>
                <a routerLink="/about/careers"><fa-icon [icon]="faBriefcase"></fa-icon> {{ 'header.nav.careers' | translate }}</a>
              </div>
            </li>
            <li class="has-dropdown">
              <a routerLink="/media" routerLinkActive="active">
                <fa-icon [icon]="faPhotoVideo"></fa-icon> {{ 'header.nav.media' | translate }}
              </a>
              <div class="dropdown-menu">
                <a routerLink="/media/videos"><fa-icon [icon]="faVideo"></fa-icon> {{ 'header.nav.videos' | translate }}</a>
                <a routerLink="/media/photos"><fa-icon [icon]="faCamera"></fa-icon> {{ 'header.nav.photos' | translate }}</a>
                <a routerLink="/media/gallery"><fa-icon [icon]="faImages"></fa-icon> {{ 'header.nav.gallery' | translate }}</a>
              </div>
            </li>
            <li><a routerLink="/contact" routerLinkActive="active">
              <fa-icon [icon]="faEnvelope"></fa-icon> {{ 'header.nav.contact' | translate }}
            </a></li>
          </ul>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';
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

  onSearch() {
    // TODO: Implement search functionality
    console.log('Search query:', this.searchQuery);
  }

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.languageChange.emit(lang);
    this.showLanguageMenu = false;
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