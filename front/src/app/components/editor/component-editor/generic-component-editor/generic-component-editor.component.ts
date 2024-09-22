import { SaveDataService } from './../../../../services/save-data-service';
import { Component, inject, Input, Type } from '@angular/core';
import { ComponentData } from '../../../../../models/Data';
import { EditorDirective } from '../../editor.directive';
import { SidebarService } from '../../../../services/sidebar-service';
import { ComponentRegistry } from '../../../component.registry';
import { DataQuery } from '../../data-query';

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
  sideBarService = inject(SidebarService)


  loadFromLocalStorage() {
    let rootData = this.editor?.getRootData();
    if (rootData) {
      this.saveDataService.locaLodalData(this.editor?.rootKey!);
    }
  }


  remove() {
    if (confirm("Are you sure you want to remove this component?")) {
      this.editor?.removeComponent(this.data?.path!);
    }
  }

  saveToLocalStorage() {
    let rootData = this.editor?.getRootData();
    if (rootData) {
      this.saveDataService.saveLocalData(this.editor?.rootKey!, rootData);
    }
  }

  public static OpenSideBarForComponent<T extends ComponentData>(data: T, editor: EditorDirective, sidebarService: SidebarService) {

    let genericEditor = sidebarService.show<GenericComponentEditorComponent<T>>(GenericComponentEditorComponent)
    genericEditor.data = data
    genericEditor.editor = editor
    if (data) {
      genericEditor.editorType = ComponentRegistry.getEditorComponentForType(data.type)
    }
  }


  goToParent() {
    let query = new DataQuery(this.editor!.getRootData()!)
    let parent = query.getParent(this.data!.path!)
    if (parent && parent.path) {
      GenericComponentEditorComponent.OpenSideBarForComponent(parent, this.editor!, this.sideBarService)
    }
  }
}
