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
  styles: [`
    .footer {
      //background: #C8E1FE;
      background: linear-gradient(135deg, #41BE5C, #BE41A3);
      color: #222831;
      padding: 0;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 2rem 0.5rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .footer-section h3 {
      color: #222831;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
    }
    .footer-section p {
      color: #222831;
      margin: 0.3rem 0;
      opacity: 0.8;
      font-size: 0.9rem;
    }
    .footer-section a {
      color: #222831;
      text-decoration: none;
      display: block;
      margin: 0.3rem 0;
      opacity: 0.8;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }
    .footer-section a:hover {
      color: #41BE5C;
      opacity: 1;
    }
    .social-links {
      display: flex;
      gap: 0.8rem;
    }
    .social-link {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #222831;
      transition: all 0.3s ease;
      border: 1px solid #41BE5C;
      font-size: 0.9rem;
    }
    .social-link:hover {
      background: #41BE5C;
      color: white;
      transform: translateY(-2px);
    }
    .footer-bottom {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #41BE5C;
    }
    .footer-bottom p {
      color: #222831;
      opacity: 0.8;
      font-size: 0.85rem;
    }
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 