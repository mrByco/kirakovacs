import { SidebarService } from '../services/sidebar-service';
import { ComponentData } from './../../models/Data';
import { Directive, HostListener, Inject, inject, Input } from "@angular/core";
import { GenericComponentEditorComponent } from './editor/component-editor/generic-component-editor/generic-component-editor.component';
import { ComponentRegistry } from './component.registry';
import { EditorDirective } from './editor/editor.directive';

@Directive({
})
export class BaseComponent<T extends ComponentData> {
  private sidebarService = inject(SidebarService)

  constructor() { }

  protected readonly editor: EditorDirective = inject(EditorDirective)

  @Input()
  protected data: T | undefined = undefined;

  @HostListener('click', ["$event"])
  onClick($event: MouseEvent) {
    $event.stopPropagation()
    let genericEditor = this.sidebarService.show<GenericComponentEditorComponent<T>>(GenericComponentEditorComponent)
    genericEditor.data = this.data
    genericEditor.editor = this.editor
    if (this.data) {
      console.log(ComponentRegistry.getEditorComponentForType(this.data.type))
      genericEditor.editorType = ComponentRegistry.getEditorComponentForType(this.data.type)
    }
  }

  cssPropertiesToJSON(cssProperties: any) {
    let json = {} as any

    // Split the CSS properties by semicolon
    let properties = cssProperties.split('\n').filter((prop: any) => prop.trim().length);

    properties.forEach((prop: any) => {
      // Split by the colon to get the key-value pairs
      let [key, value] = prop.split(':');

      if (key && value) {
        key = key.trim();
        value = value.trim();
        json[key] = value;
      }
    });

    return json;
  }

  protected getStyle(): any {
    try {
      return this.cssPropertiesToJSON(this.data?.css || "")
    }
    catch (e) {
      return {}
    }
  }

  protected getStyleString(): string {
    let json = JSON.stringify(this.getStyle());

    return json.substring(1, json.length - 1).replace(/"/g, "").replace(/,/g, ";");
  }
}
