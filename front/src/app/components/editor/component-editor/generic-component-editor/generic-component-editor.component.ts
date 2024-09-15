import { SaveDataService } from './../../../../services/save-data-service';
import { Component, inject, Input, Type } from '@angular/core';
import { ComponentData } from '../../../../../models/Data';
import { EditorDirective } from '../../editor.directive';

@Component({
  selector: 'app-generic-component-editor',
  templateUrl: './generic-component-editor.component.html',
  styleUrl: './generic-component-editor.component.scss'
})
export class GenericComponentEditorComponent<T extends ComponentData> {
  @Input() data: T | undefined = undefined;
  @Input() editorType: Type<unknown> | undefined = undefined;
  @Input() editor: EditorDirective | undefined = undefined;

  saveDataService = inject(SaveDataService)


  loadFromLocalStorage() {
    let rootData = this.editor?.getRootData();
    if (rootData) {
      this.saveDataService.locaLodalData(this.editor?.rootKey!);
    }
  }

  saveToLocalStorage() {
    let rootData = this.editor?.getRootData();
    if (rootData) {
      this.saveDataService.saveLocalData(this.editor?.rootKey!, rootData);
    }
  }
}
