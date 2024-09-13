import { Component } from '@angular/core';
import { BaseComponentData } from '../../../../models/Data';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { BaseComponent } from '../../base-component';
import { TextEditorComponent } from './text-editor/text-editor.component';

export interface TextC extends BaseComponentData {
  type: "text";
  text: string;
}

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent extends BaseComponent<TextC> {

}

DynamicComponent.registerComponent('text', TextComponent, TextEditorComponent)
