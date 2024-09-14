import { Type } from "@angular/core";
import { ComponentData } from "../../models/Data";

interface ComponentRegistryItem {
  component: Type<any>,
  editor: Type<any>,
  children?: {
    getChildren: (self: ComponentData) => ComponentData[]
    fixChildrenPaths: (self: ComponentData) => void
  }
}

export class ComponentRegistry {


  private static items: { [key: string]: ComponentRegistryItem } = {}

  static getComponentForType(type: string): Type<unknown> {
    return ComponentRegistry.items[type].component;
  }

  static getEditorComponentForType(type: string): Type<unknown> {
    return ComponentRegistry.items[type].editor;
  }

  public static registerComponent(name: string, ComponentRegistryItem: ComponentRegistryItem) {
    ComponentRegistry.items[name] = ComponentRegistryItem
  }

  static getChildrenTools(type: string) {
    return ComponentRegistry.items[type].children;
  }

}
