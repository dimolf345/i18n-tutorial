import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LanguageService } from './services/language.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ng-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'i18n-tutorial';
  #language = inject(LanguageService);
  #document = inject(DOCUMENT);

  ngOnInit(): void {
    const { activeLanguage } = this.#language;

    if (activeLanguage && !location.pathname.includes(activeLanguage)) {
      this.#document.location.href = `/${activeLanguage}`;
    }
  }
}
