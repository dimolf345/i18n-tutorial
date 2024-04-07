import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { ApiService } from '../services/api.service';

export const languageApiInterceptor: HttpInterceptorFn = (req, next) => {
  const language = localStorage.getItem('language');
  const apiUrl = inject(ApiService).apiUrl;

  let newReq = req.clone({
    setHeaders: {
      'Accept-Language': 'language',
    },
  });

  if (newReq.method === 'GET' && req.url.includes(apiUrl)) {
    newReq = newReq.clone({
      url: newReq.url + `?sheet=${language}`,
    });
  }

  return next(newReq);
};
