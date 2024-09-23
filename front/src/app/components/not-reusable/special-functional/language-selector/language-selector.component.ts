import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {

  protected readonly languageService = inject(LanguageService);

  protected languages = LanguageService.AvailableLanguages;

  public get currentLanguage() {
    return this.languageService.currentLanguage;
  }

  public set currentLanguage(value: string) {
    this.languageService.currentLanguage = value;
  }

}
