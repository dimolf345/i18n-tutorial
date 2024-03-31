import { FormControl } from "@angular/forms";

export interface IContactForm {
  name: FormControl<string>
  surname: FormControl<string>
  address: FormControl<string>
  city: FormControl<string>
  country: FormControl<string>
  zip: FormControl<string>
  telephone: FormControl<string>
}

export type ContactFormData = Partial<{
  [K in keyof IContactForm]: string
}>