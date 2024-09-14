import { Directive, Input } from "@angular/core";
import { ComponentData } from "../../../models/Data";

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective {

  @Input()
  protected data: ComponentData | undefined = undefined;

  constructor() { }
}
