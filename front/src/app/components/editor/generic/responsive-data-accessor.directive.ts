import { GenericComponentEditorComponent } from './../component-editor/generic-component-editor/generic-component-editor.component';
import { Directive, inject, Input } from "@angular/core";
import { ResponiveProp, screenSize } from "../../../../models/Data";

@Directive({
  selector: '[appResponsiveDataAccessor]',
  exportAs: 'resProp'
})
export class ResponsiveDataAccessorDirective<T> {

  @Input() data: ResponiveProp<T> | undefined;

  @Input() genericComponentEditor = inject(GenericComponentEditorComponent);

  public get value(): T | undefined {
    let v = this.data?.find(x => x.key === this.genericComponentEditor.editor?.selectedScreenSize)?.value;
    if (!v) {
      v = this.data?.find(x => x.key === 'default')?.value;
    }
    return v;
  }
  public set value(value: T | undefined) {
    if (!this.data || !this.genericComponentEditor.editor) return;
    let index = this.data.findIndex(x => x.key === this.genericComponentEditor.editor?.selectedScreenSize);

    if (value === undefined) {
      this.data.splice(index, 1);
      return;
    }

    if (index === -1) {
      this.data.push({ key: this.genericComponentEditor.editor?.selectedScreenSize, value });
      return;
    }

    this.data[index].value = value;
  }

  constructor() { }
}
