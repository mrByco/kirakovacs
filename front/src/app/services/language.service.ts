import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { LanguageString } from "../../models/LanguageString";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static SelectedLanguage: string = "hu";

  public get currentLanguage(): string {
    return this._currentLanguage;
  }
  public set currentLanguage(v: string) {
    this._currentLanguage = v;
    this.translateService.use(v);
    LanguageService.SelectedLanguage = v;
    localStorage?.setItem("selected-language", v)
  }
  private _currentLanguage: string = '';

  constructor(private translateService: TranslateService) {
    if (isPlatformBrowser(inject(PLATFORM_ID)))
      this.currentLanguage = localStorage?.getItem('selected-language') ?? 'hu';
  }

  public display(languageString?: LanguageString): string {
    return LanguageService.getLanguageStringValue(languageString, this.currentLanguage);
  }

  public static getLanguageStringValue(langString: LanguageString | null | undefined, langCode: string): string {
    return langString?.[langCode] ?? langString?.[this.SelectedLanguage] ?? '';
  }
}
