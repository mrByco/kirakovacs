import { SaveDataService } from './../../services/save-data-service';
import { Component, inject, Input, OnDestroy, OnInit, PLATFORM_ID, Type } from '@angular/core';
import { ComponentData } from '../../../models/Data';
import { ComponentRegistry } from '../component.registry';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss'
})
export class DynamicComponent {

  private _data: ComponentData | undefined = undefined;
  public get data(): ComponentData | undefined {
    return this._data;
  }

  @Input()
  public set data(value: ComponentData | undefined) {
    this._data = value;
    if (value) {
      this.componentType = ComponentRegistry.getComponentForType(value.type);
    }
  }


  protected componentType: Type<any> | undefined = undefined;

}
