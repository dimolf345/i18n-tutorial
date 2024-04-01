import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../../services/cart.service';
import { IContactForm } from '../../models/contact';

@Component({
  selector: 'ng-contact-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
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

    .btn-text {
      display: inline-block;
      margin-left: 0.5rem;
      vertical-align: baseline;
    }

    mat-card-actions {
      justify-content: space-between;
    }
  `,
})
export class ContactFormComponent implements OnInit {
  #fb = inject(FormBuilder);
  #cart = inject(CartService);

  contactForm = this.createForm();

  ngOnInit(): void {
    if (this.#cart.userData) {
      this.contactForm.patchValue(this.#cart.userData);
    }

    if (this.#cart.contactConfirmed()) {
      this.contactForm.disable();
    }

    this.contactForm.statusChanges.subscribe((status) => {
      this.#cart.contactConfirmed.set(status === 'VALID');
    });
  }

  saveInfo(disableForm: boolean = false) {
    const formValue = this.contactForm.value;
    this.#cart.userData = formValue;

    if (disableForm) {
      this.contactForm.disable();
      this.#cart.contactConfirmed.set(true);
    }
  }

  private createForm() {
    return this.#fb.nonNullable.group<IContactForm>({
      name: this.#fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      surname: this.#fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      address: this.#fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      city: this.#fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      country: this.#fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(3),
      ]),
      zip: this.#fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.pattern(/\d{4}/),
      ]),
      telephone: this.#fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.pattern(/\d{8}/),
      ]),
    });
  }
}
