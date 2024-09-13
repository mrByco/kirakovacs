import { Component, Input } from '@angular/core';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { BaseComponentData, ComponentData } from '../../../../models/Data';
import { BaseComponent } from '../../base-component';
import { GenericComponentEditorComponent } from '../../editor/component-editor/generic-component-editor/generic-component-editor.component';


export interface ContainerC extends BaseComponentData {
  type: "container";
  slot: ComponentData[]
}

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent extends BaseComponent<ContainerC> {

}

DynamicComponent.registerComponent('container', ContainerComponent, GenericComponentEditorComponent)

