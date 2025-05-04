import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-container">
      <section class="hero">
        <h1>About ANRSI</h1>
        <p>Advancing scientific research and innovation for a better future</p>
      </section>

      <section class="mission">
        <h2>Our Mission</h2>
        <p>The National Agency for Scientific Research and Innovation (ANRSI) is dedicated to fostering scientific excellence and technological innovation. We support groundbreaking research, facilitate collaboration between academia and industry, and promote the development of innovative solutions to address global challenges.</p>
      </section>

      <section class="values">
        <h2>Our Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <h3>Excellence</h3>
            <p>We strive for the highest standards in scientific research and innovation.</p>
          </div>
          <div class="value-card">
            <h3>Collaboration</h3>
            <p>We foster partnerships between researchers, institutions, and industry.</p>
          </div>
          <div class="value-card">
            <h3>Integrity</h3>
            <p>We maintain the highest ethical standards in all our activities.</p>
          </div>
          <div class="value-card">
            <h3>Impact</h3>
            <p>We focus on research that creates meaningful societal impact.</p>
          </div>
        </div>
      </section>

      <section class="areas">
        <h2>Research Areas</h2>
        <div class="areas-grid">
          <div class="area-card">
            <h3>Basic Research</h3>
            <p>Fundamental scientific discoveries and theoretical advancements</p>
          </div>
          <div class="area-card">
            <h3>Applied Research</h3>
            <p>Practical applications of scientific knowledge</p>
          </div>
          <div class="area-card">
            <h3>Technology Development</h3>
            <p>Innovation in emerging technologies</p>
          </div>
          <div class="area-card">
            <h3>Social Sciences</h3>
            <p>Research addressing societal challenges</p>
          </div>
        </div>
      </section>

      <section class="team">
        <h2>Leadership Team</h2>
        <div class="team-grid">
          <div class="team-member">
            <img src="/assets/images/director.jpg" alt="Director">
            <h3>Dr. Sarah Johnson</h3>
            <p>Director General</p>
          </div>
          <div class="team-member">
            <img src="/assets/images/research-director.jpg" alt="Research Director">
            <h3>Prof. Michael Chen</h3>
            <p>Research Director</p>
          </div>
          <div class="team-member">
            <img src="/assets/images/innovation-director.jpg" alt="Innovation Director">
            <h3>Dr. Emily Rodriguez</h3>
            <p>Innovation Director</p>
          </div>
        </div>
      </section>

      <section class="contact">
        <h2>Get in Touch</h2>
        <p>Interested in collaborating with us or learning more about our work?</p>
        <a routerLink="/contact" class="contact-button">Contact Us</a>
      </section>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/about-hero.jpg');
      background-size: cover;
      background-position: center;
      color: white;
      margin: -2rem -2rem 2rem -2rem;
    }
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    section {
      margin-bottom: 4rem;
    }
    h2 {
      color: #2c3e50;
      margin-bottom: 2rem;
      text-align: center;
    }
    .mission {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 4rem;
    }
    .mission p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
    }
    .values-grid, .areas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    .value-card, .area-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    .value-card h3, .area-card h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    .value-card p, .area-card p {
      color: #666;
      line-height: 1.6;
    }
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    .team-member {
      text-align: center;
    }
    .team-member img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
    }
    .team-member h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    .team-member p {
      color: #666;
    }
    .contact {
      text-align: center;
      background: #f8f9fa;
      padding: 3rem;
      border-radius: 8px;
    }
    .contact p {
      margin-bottom: 2rem;
      color: #666;
    }
    .contact-button {
      display: inline-block;
      padding: 1rem 2rem;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    .contact-button:hover {
      background: #2980b9;
    }
  `]
})
export class AboutComponent {
  // Component logic here
} 