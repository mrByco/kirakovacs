import { Directive, Input } from "@angular/core";
import { ComponentData } from "../../models/Data";

@Directive({})
export class BaseEditorComponent<T extends ComponentData> {
  @Input()
  protected data: T | undefined = undefined;
}
