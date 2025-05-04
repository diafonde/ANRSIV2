import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>Address: 123 Science Street</p>
          <p>Phone: +123 456 7890</p>
          <p>Email: info&#64;anrsi.gov</p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <a routerLink="/about">About Us</a>
          <a routerLink="/news">News</a>
          <a routerLink="/research">Research</a>
          <a routerLink="/contact">Contact</a>
        </div>
        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 ANRSI. All rights reserved.</p>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 