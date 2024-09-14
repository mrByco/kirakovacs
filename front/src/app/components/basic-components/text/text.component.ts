import { Component } from '@angular/core';
import { BaseComponentData } from '../../../../models/Data';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { BaseComponent } from '../../base-component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ComponentRegistry } from '../../component.registry';

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

ComponentRegistry.registerComponent('text',
  {
    component: TextComponent,
    editor: TextEditorComponent
  }
)
