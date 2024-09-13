import { Component } from '@angular/core';
import { BaseEditorComponent } from '../../../base-editor-component';
import { TextC } from '../text.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent extends BaseEditorComponent<TextC> {

}
