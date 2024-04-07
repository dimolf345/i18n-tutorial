import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { languageApiInterceptor } from './interceptors/language-api.interceptor';

const defaultFormField: MatFormFieldDefaultOptions = {
  floatLabel: 'auto',
  appearance: 'outline',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([languageApiInterceptor])),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: defaultFormField },
  ],
};
