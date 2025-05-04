import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  template: `
    <div class="contact-container">
      <section class="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our team for any inquiries about research, collaboration, or general information.</p>
      </section>

      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card">
            <h3>Address</h3>
            <p>123 Science Avenue</p>
            <p>Research City, RC 12345</p>
          </div>
          <div class="info-card">
            <h3>Phone</h3>
            <p>Main: (123) 456-7890</p>
            <p>Support: (123) 456-7891</p>
          </div>
          <div class="info-card">
            <h3>Email</h3>
            <p>General: info@anrsi.gov</p>
            <p>Research: research@anrsi.gov</p>
          </div>
          <div class="info-card">
            <h3>Office Hours</h3>
            <p>Monday - Friday</p>
            <p>9:00 AM - 5:00 PM</p>
          </div>
        </div>

        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
          <h2>Send us a Message</h2>
          
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name"
              [class.error]="isFieldInvalid('name')"
              placeholder="Enter your full name">
            <div class="error-message" *ngIf="isFieldInvalid('name')">
              Please enter your name
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              [class.error]="isFieldInvalid('email')"
              placeholder="Enter your email address">
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              Please enter a valid email address
            </div>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <select 
              id="subject" 
              formControlName="subject"
              [class.error]="isFieldInvalid('subject')">
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="research">Research Collaboration</option>
              <option value="grants">Grant Information</option>
              <option value="other">Other</option>
            </select>
            <div class="error-message" *ngIf="isFieldInvalid('subject')">
              Please select a subject
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              formControlName="message"
              [class.error]="isFieldInvalid('message')"
              rows="5"
              placeholder="Enter your message"></textarea>
            <div class="error-message" *ngIf="isFieldInvalid('message')">
              Please enter your message
            </div>
          </div>

          <button 
            type="submit" 
            [disabled]="contactForm.invalid || isSubmitting"
            class="submit-button">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .contact-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .contact-header h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    .contact-header p {
      color: #666;
      font-size: 1.1rem;
    }
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 3rem;
    }
    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .info-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .info-card h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    .info-card p {
      color: #666;
      margin: 0.5rem 0;
    }
    .contact-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .contact-form h2 {
      color: #2c3e50;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }
    input, select, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    input.error, select.error, textarea.error {
      border-color: #e74c3c;
    }
    .error-message {
      color: #e74c3c;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
    .submit-button {
      width: 100%;
      padding: 1rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .submit-button:hover:not(:disabled) {
      background: #2980b9;
    }
    .submit-button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      // TODO: Implement form submission logic
      console.log(this.contactForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        this.contactForm.reset();
        // TODO: Show success message
      }, 1000);
    }
  }
} 