import { Directive, Input } from "@angular/core";
import { ComponentData } from "../../../models/Data";

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective {

  @Input()
  public data: ComponentData | undefined = undefined;

  constructor() { }

  public getRootData(): ComponentData | undefined {
    return this.data;
  }
}
