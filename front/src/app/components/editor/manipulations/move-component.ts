import { ComponentData } from "../../../../models/Data";
import { MaintainAllComponentData } from "../data-maintainer";
import { DataQuery } from "../data-query";

export function MoveComponentData(root: ComponentData, source: string, destination: string, targetIndex: number = 0) {
  let query = new DataQuery(root)
  let sourceData = query.getItemByPath(source)

  if (!sourceData) {
    throw new Error("Source not found")
  }

  let sourceParent = query.getParent(source);
  let targetParent = query.getItemByPath(destination);

  if (sourceParent?.type != 'container' || targetParent?.type != 'container') {
    throw new Error("Invalid operation")
  }

  let sourceIndex = sourceParent.slot.findIndex((x) => x == sourceData)

  sourceParent.slot.splice(sourceIndex, 1)
  targetParent.slot.splice(targetIndex, 0, sourceData)

  MaintainAllComponentData(root)
}
