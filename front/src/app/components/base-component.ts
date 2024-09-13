import { SidebarService } from '../services/sidebar-service';
import { ComponentData } from './../../models/Data';
import { Directive, HostListener, inject, Input } from "@angular/core";
import { DynamicComponent } from './dynamic/dynamic.component';
import { GenericComponentEditorComponent } from './editor/component-editor/generic-component-editor/generic-component-editor.component';

@Directive({
})
export class BaseComponent<T extends ComponentData> {
  private sidebarService = inject(SidebarService)

  constructor() { }

  @Input()
  protected data: T | undefined = undefined;

  @HostListener('click', ["$event"])
  onClick($event: MouseEvent) {
    $event.stopPropagation()
    let genericEditor = this.sidebarService.show<GenericComponentEditorComponent<T>>(GenericComponentEditorComponent)
    genericEditor.data = this.data
    if (this.data)
      genericEditor.editorType = DynamicComponent.getEditorComponentForType(this.data.type)
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
    console.log(this.data?.css)
    try {
      return this.cssPropertiesToJSON(this.data?.css || "")
    }
    catch (e) {
      console.error(e)
      return {}
    }
  }
}
