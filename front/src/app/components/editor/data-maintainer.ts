import { ComponentData } from "../../../models/Data";
import { ComponentRegistry } from "../component.registry";

export function MaintainAllComponentData(data: ComponentData) {
  FixIdsForComponent(data, true);
}
function FixIdsForComponent(data: ComponentData, root: boolean = false) {
  if (root) {
    data.path = data.userId;
  }

  let tools = ComponentRegistry.getChildrenTools(data.type);
  if (!tools) {
    return;
  }

  tools.fixChildrenPaths(data);
  let children = tools.getChildren(data);
  children.forEach((child) => {
    FixIdsForComponent(child);
  });
}

