import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" [dir]="currentLang === 'ar' ? 'rtl' : 'ltr'">
      <app-header (languageChange)="switchLanguage($event)"></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
    }

    .main-content {
      flex: 1;
      margin-top: 140px; /* Account for fixed header */
      margin-bottom: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }

    [dir="rtl"] {
      text-align: right;
    }
  `]
})
export class AppComponent {
  currentLang: string = 'en';

  constructor(private translate: TranslateService) {
    // Add languages
    translate.addLangs(['en', 'fr', 'ar']);
    
    // Set default language
    translate.setDefaultLang('en');
    
    // Get browser language
    const browserLang = translate.getBrowserLang();
    const lang = browserLang?.match(/en|fr|ar/) ? browserLang : 'en';
    
    // Use the language
    this.currentLang = lang;
    translate.use(lang);
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
