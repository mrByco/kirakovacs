
import { ChangeDetectorRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { LanguageString } from '../../../models/LanguageString';
@Pipe({
  name: 'multiLang',
  pure: false
})
export class MultiLangPipe implements PipeTransform {
  private translatePipe: TranslatePipe;

  constructor(private langaugeService: LanguageService, injector: Injector) {
    this.translatePipe = new TranslatePipe(injector.get(TranslateService), injector.get(ChangeDetectorRef));
  }

  public transform(value: string | LanguageString | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'object') {
      return this.langaugeService.display(value);
    }
    return this.translatePipe.transform(value);
  }
}
