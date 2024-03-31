import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ng-contact-form',
  standalone: true,
  imports: [MatCardModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styles: `
    mat-card {
      padding: 1rem;
    }

    mat-card-content {
      padding: 1rem 0;
    }

    .contact-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      justify-content: center;
      gap: 1rem;
    }

  `,
})
export class ContactFormComponent {
  #fb = inject(FormBuilder);
  contactForm = this.createForm();

  private createForm() {
    return this.#fb.group({
      name: this.#fb.control<string>('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      surname: this.#fb.control<string>('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      address: this.#fb.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      city: this.#fb.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      country: this.#fb.control<string>('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(3),
      ]),
      zip: this.#fb.control<string>('', [
        Validators.required,
        Validators.pattern(/\d{4}/),
      ]),
      telephone: this.#fb.control<string>('', [
        Validators.required,
        Validators.pattern(/\d{8}/),
      ]),
    });
  }
}
