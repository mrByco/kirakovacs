import { BaseComponentData, ComponentData, getDefaultBaseComponentData, getDefaultResponsiveProp, ResponiveProp as ResponsiveProp } from "../../../../models/Data";
import { ComponentRegistry } from "../../component.registry";
import { ContainerEditorComponent } from "./container-editor/container-editor.component";
import { ContainerComponent } from "./container.component";


export interface ContainerC extends BaseComponentData {
  type: "container";

  direction: ResponsiveProp<"row" | "column">;
  align: "stretch" | "start" | "center" | "end";
  justify: "center" | "start" | "end" | "space-between" | "space-around" | "space-evenly" | "stretch";
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
    editor: ContainerEditorComponent,
    children: {
      getChildren,
      fixChildrenPaths
    },
    createNew: () => {
      return {
        ...getDefaultBaseComponentData(),
        type: "container",
        direction: getDefaultResponsiveProp("row"),
        align: "stretch",
        justify: "center",
        slot: []
      }
    }
  });
}

RegisterContainer();
