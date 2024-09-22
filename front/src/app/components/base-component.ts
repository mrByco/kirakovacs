import { SidebarService } from '../services/sidebar-service';
import { ComponentData } from './../../models/Data';
import { Directive, ElementRef, HostListener, Inject, inject, Input, Renderer2 } from "@angular/core";
import { GenericComponentEditorComponent } from './editor/component-editor/generic-component-editor/generic-component-editor.component';
import { ComponentRegistry } from './component.registry';
import { EditorDirective } from './editor/editor.directive';

@Directive({
})
export class BaseComponent<T extends ComponentData> {
  private sidebarService = inject(SidebarService)

  constructor() { }

  protected readonly editor: EditorDirective = inject(EditorDirective)
  protected readonly renderer = inject(Renderer2)
  protected readonly elementRef = inject(ElementRef)

  @Input()
  protected data: T | undefined = undefined;

  @HostListener('click', ["$event"])
  onClick($event: MouseEvent) {
    $event.stopPropagation()
    GenericComponentEditorComponent.OpenSideBarForComponent(this.data!, this.editor, this.sidebarService)
  }


  // Listen for mouseenter event
  @HostListener('mouseenter') onMouseEnter() {
    this.setHoverStyle('2px solid black');  // Change the background color when hovered
  }

  // Listen for mouseleave event
  @HostListener('mouseleave') onMouseLeave() {
    this.setHoverStyle(null);  // Reset the background color when hover ends
  }

  // Apply or remove styles on hover
  private setHoverStyle(border: string | null) {
    let hoverTargets = this.findAllParentDynamics(this.elementRef.nativeElement);
    let hoverTarget = hoverTargets.shift();
    this.renderer.setStyle(hoverTarget, 'border', border);

    for (let target of hoverTargets) {
      this.renderer.setStyle(target, 'border', null);
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
    let cssAsObject = {} as any;
    try {
      cssAsObject = this.cssPropertiesToJSON(this.data?.css || "")
    }
    catch (e) {
      cssAsObject = {}
    }
    if (this.data?.margin) {
      cssAsObject["margin"] = this.data.margin
    }
    if (this.data?.padding) {
      cssAsObject["padding"] = this.data.padding
    }
    return cssAsObject;
  }

  protected getStyleString(): string {
    let json = JSON.stringify(this.getStyle());

    return json.substring(1, json.length - 1).replace(/"/g, "").replace(/,/g, ";");
  }

  private findAllParentDynamics(element: any): any[] {
    let parent = element.parentElement;
    let parents = [];

    // Traverse up the DOM and collect all parent <app-dynamic> elements
    while (parent) {
      if (parent.tagName.toLowerCase() === 'app-dynamic') {
        parents.push(parent);  // Add the <app-dynamic> parent to the array
      }
      parent = parent.parentElement;  // Move to the next parent
    }

    return parents;  // Return the array of all found <app-dynamic> parents
  }

}
