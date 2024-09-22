import { ComponentData } from "../../../../models/Data";
import { MaintainAllComponentData } from "../data-maintainer";
import { DataQuery } from "../data-query";

export function RemoveComponentData(root: ComponentData, path: string) {
  let query = new DataQuery(root)
  let data = query.getItemByPath(path)

  if (!data) {
    throw new Error("Item not found")
  }

  let parent = query.getParent(path)

  if (parent?.type != 'container') {
    throw new Error("Invalid operation")
  }

  let index = parent.slot.findIndex((x) => x == data)

  parent.slot.splice(index, 1)

  MaintainAllComponentData(root)

}
