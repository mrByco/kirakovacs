import { Component, inject, OnInit } from '@angular/core';
import { BaseEditorComponent } from '../../../base-editor-component';
import { TextC } from '../text.type';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent extends BaseEditorComponent<TextC> implements OnInit {

  protected readonly languageService = inject(LanguageService);

  public get text() {
    return this.data?.text[this.languageService.currentLanguage] ?? "";
  }

  public set text(value: string) {
    if (!this.data) {
      return
    }
    this.data.text[this.languageService.currentLanguage] = value;
  }


  ngOnInit(): void {
    if (this.data && typeof this.data.text !== 'object') {
      this.data.text = {};
    }
  }

}
