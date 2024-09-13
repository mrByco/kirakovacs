import { Component, Input, OnInit, Type } from '@angular/core';
import { ComponentData } from '../../../models/Data';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss'
})
export class DynamicComponent {
  private static componentRegistry: { [key: string]: Type<any> } = {}

  private _data: ComponentData | undefined = undefined;
  public get data(): ComponentData | undefined {
    return this._data;
  }
  @Input()
  public set data(value: ComponentData | undefined) {
    this._data = value;
    if (value) {
      this.componentType = DynamicComponent.componentRegistry[value.type]
    }
  }
  protected componentType: Type<any> | undefined = undefined;

  public static registerComponent(name: string, component: Type<any>) {
    DynamicComponent.componentRegistry[name] = component
  }

  static getComponentForType(type: string): Type<unknown> {
    return DynamicComponent.componentRegistry[type]
  }


}
