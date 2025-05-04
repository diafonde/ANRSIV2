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
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
 
    .top-bar {
      background: linear-gradient(135deg,rgb(2, 5, 39),rgb(4, 9, 45));
      color: white;
      padding: 0.5rem 0;
      font-size: 0.9rem;
    }

    .top-bar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .top-bar a {
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .top-bar a:hover {
      color:rgb(9, 43, 70);
    }

    .divider {
      margin: 0 1rem;
      opacity: 0.5;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-right: 1.5rem;
    }

    .social-link {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .lang-switch {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .lang-switch:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .main-header {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      padding: 2rem 0;
      border-bottom: 1px solid rgba(122, 198, 210, 0.1);
      min-height: 140px;
      display: flex;
      align-items: center;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo a {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-icon {
      width: 120px;
      height: 120px;
      transition: transform 0.3s ease;
    }

    .logo:hover .logo-icon {
      transform: scale(1.1);
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .logo-text h1 {
      color: rgb(2, 19, 22);
      margin: 0;
      font-size: 2.2rem;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .logo-text h3 {
      color: #666;
      font-size: 1.1rem;
      margin: 0.5rem 0 0 0;
      font-weight: 500;
    }

    .search-box {
      position: relative;
      width: 300px;
    }

    .search-box form {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-box input {
      width: 100%;
      padding: 0.8rem 1.5rem;
      border: 2px solid #41BE5C;
      border-radius: 30px;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      background: #f5f5f5;
    }

    .search-box input:focus {
      border-color: #BE41A3;
      background: white;
      outline: none;
      box-shadow: 0 0 0 4px rgba(65, 190, 92, 0.1);
    }

    .search-box button {
      position: absolute;
      right: 0.8rem;
      top: 50%;
      transform: translateY(-50%);
      background: #41BE5C;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .search-box button:hover {
      background: #BE41A3;
      transform: translateY(-50%) scale(1.05);
    }

    .main-nav {
      background: linear-gradient(135deg, #41BE5C, #BE41A3);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(65, 190, 92, 0.1);
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .main-nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 2rem;
    }

    .main-nav li {
      position: relative;
    }

    .main-nav a {
      color: white;
      text-decoration: none;
      padding: 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .main-nav a:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    .main-nav a.active {
      color: white;
      position: relative;
    }

    .main-nav a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: white;
      border-radius: 3px 3px 0 0;
    }

    .has-dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: -1rem;
      background: white;
      min-width: 220px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 100;
      padding: 0.5rem 0;
    }

    .dropdown-menu a {
      color: #333;
      padding: 0.8rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      border-bottom: 1px solid #f0f0f0;
    }

    .dropdown-menu a:last-child {
      border-bottom: none;
    }

    .dropdown-menu a:hover {
      background: #f8f9fa;
      color: #41BE5C;
    }

    .dropdown-menu i {
      width: 20px;
      color: #666;
    }

    @media (max-width: 1024px) {
      .logo-text span {
        display: none;
      }

      .search-box {
        width: 250px;
      }

      .main-nav ul {
        gap: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .top-bar-left {
        display: none;
      }

      .social-links {
        display: none;
      }

      .main-header {
        padding: 1rem 0;
        min-height: 100px;
      }

      .logo-icon {
        width: 60px;
        height: 60px;
      }

      .logo-text h1 {
        font-size: 1.6rem;
      }

      .search-box {
        width: 200px;
      }

      .main-nav ul {
        gap: 1rem;
      }

      .main-nav a {
        font-size: 0.9rem;
      }
    }

    .language-switcher {
      position: relative;
    }

    .lang-btn {
      padding: 0.5rem 1rem;
      background: #41BE5C;
      color: white;
      border: 1px solid #BE41A3;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      min-width: 80px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .lang-btn i {
      font-size: 0.8rem;
      transition: transform 0.3s;
    }

    .language-dropdown.show .lang-btn i {
      transform: rotate(180deg);
    }

    .lang-btn:hover {
      background: #BE41A3;
    }

    .language-dropdown {
      position: absolute;
      top: calc(100% + 5px);
      right: 0;
      background: #41BE5C;
      border: 1px solid #BE41A3;
      border-radius: 4px;
      min-width: 150px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s;
      z-index: 2000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .language-dropdown.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .language-dropdown button {
      width: 100%;
      padding: 0.8rem 1rem;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s;
      text-align: left;
    }

    .language-dropdown button:hover {
      background: #BE41A3;
    }

    .language-dropdown button.active {
      background: #BE41A3;
    }

    .lang-code {
      font-weight: 600;
      min-width: 40px;
    }

    .lang-name {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .language-dropdown {
        right: 0;
      }
    }
  `]
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