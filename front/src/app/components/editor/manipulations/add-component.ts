import { ComponentData } from "../../../../models/Data";
import { ComponentRegistry } from "../../component.registry";
import { MaintainAllComponentData } from "../data-maintainer";
import { DataQuery } from "../data-query";

export function AddComponentData(root: ComponentData, componentKey: string, parentPath: string, index: number | undefined = 0): ComponentData {
  let query = new DataQuery(root)

  let parent = query.getItemByPath(parentPath)
  if (!parent) {
    throw new Error("Parent not found")
  }

  if (parent.type != 'container') {
    throw new Error("Invalid operation")
  }

  let newComponentData = ComponentRegistry.CreateNewComponentData(componentKey)

  let newPath = parentPath + '.' + newComponentData.userId

  let originalUserId = newComponentData.userId
  let counter = 1

  while (query.getItemByPath(newPath)) {
    newComponentData.userId = originalUserId + '-' + counter
    newPath = parentPath + '.' + newComponentData.userId

    counter++
  }

  parent.slot.splice(index, 0, newComponentData)

  MaintainAllComponentData(root)

  return newComponentData
}
