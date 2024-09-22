import { Directive, Input } from "@angular/core";
import { ComponentData, screenSize } from "../../../models/Data";
import { AddComponentData } from "./manipulations/add-component";
import { RemoveComponentData } from "./manipulations/remove-component";

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective {

  @Input()
  public data: ComponentData | undefined = undefined;

  @Input() rootKey: string | undefined = undefined;

  public selectedScreenSize: screenSize = 'default';

  constructor() { }

  public getRootData(): ComponentData | undefined {
    return this.data;
  }

  createNewComponent(componentKey: string, parentPath: string, index: number | undefined) {
    AddComponentData(this.data!, componentKey, parentPath, index);
  }

  removeComponent(path: string) {
    RemoveComponentData(this.data!, path);
  }
}
