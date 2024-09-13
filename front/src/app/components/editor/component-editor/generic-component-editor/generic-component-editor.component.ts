import { Component, Input, Type } from '@angular/core';
import { ComponentData } from '../../../../../models/Data';

@Component({
  selector: 'app-generic-component-editor',
  templateUrl: './generic-component-editor.component.html',
  styleUrl: './generic-component-editor.component.scss'
})
export class GenericComponentEditorComponent<T extends ComponentData> {
  @Input() data: T | undefined = undefined;
  @Input() editorType: Type<unknown> | undefined = undefined;
}
