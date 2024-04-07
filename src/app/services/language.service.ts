import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _activeLanguage!: 'it' | 'en';

  get activeLanguage(): 'it' | 'en' {
    return this._activeLanguage;
  }

  setLanguage(lang: 'it' | 'en') {
    this._activeLanguage = lang;
    localStorage.setItem('language', lang);
  }

  constructor() {
    this.checkActiveLanguage();
  }

  private checkActiveLanguage() {
    const savedLang = localStorage.getItem('language');
    if (!savedLang) {
      this._activeLanguage = window.navigator.language.includes('it')
        ? 'it'
        : 'en';
      localStorage.setItem('language', this._activeLanguage);
    } else {
      this._activeLanguage = savedLang as 'it' | 'en';
    }
  }
}
