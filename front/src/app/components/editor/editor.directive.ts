import { Directive, Input } from "@angular/core";
import { ComponentData } from "../../../models/Data";
import { AddComponentData } from "./manipulations/add-component";

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective {

  @Input()
  public data: ComponentData | undefined = undefined;

  @Input() rootKey: string | undefined = undefined;

  constructor() { }

  public getRootData(): ComponentData | undefined {
    return this.data;
  }

  createNewComponent(componentKey: string, parentPath: string, index: number | undefined) {
    AddComponentData(this.data!, componentKey, parentPath, index);
  }
}
