import { BaseComponentData, ComponentData, getDefaultBaseComponentData } from "../../../../models/Data";
import { ComponentRegistry } from "../../component.registry";
import { GenericComponentEditorComponent } from "../../editor/component-editor/generic-component-editor/generic-component-editor.component";
import { ContainerComponent } from "./container.component";


export interface ContainerC extends BaseComponentData {
  type: "container";
  slot: ComponentData[]
}


function getChildren(self: ComponentData) {
  if (self.type != 'container') return [];
  return self.slot;
}

function fixChildrenPaths(self: ComponentData) {
  if (self.type != 'container') return;
  self.slot.forEach((child: ComponentData) => {
    child.path = [self.path, child.userId].join('.');
  });
}

export function RegisterContainer() {
  ComponentRegistry.registerComponent('container', {
    component: ContainerComponent,
    editor: GenericComponentEditorComponent,
    children: {
      getChildren,
      fixChildrenPaths
    },
    createNew: () => {
      return {
        ...getDefaultBaseComponentData(),
        type: "container",
        slot: []
      }
    }
  });
}

RegisterContainer();
