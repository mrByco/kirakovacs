import { ComponentData } from "../../../models/Data"
import { ComponentRegistry } from "../component.registry"

export class DataQuery {
  public dataByPath: Map<string, ComponentData> = new Map<string, ComponentData>()

  constructor(data: ComponentData) {
    this.updateDictionaries(data)
  }

  private updateDictionaries(data: ComponentData) {
    this.dataByPath = new Map<string, ComponentData>()
    this._readFullTree(data).forEach((x) => this.dataByPath.set(x.path!, x))

  }

  private _readFullTree(currentNode: ComponentData) {
    let groups: ComponentData[] = []

    if (currentNode.path?.split('.').length == 1) {
      groups.push(currentNode)
    }

    let getChildren = ComponentRegistry.getChildrenTools(currentNode.type)?.getChildren
    if (!getChildren) return groups
    let children = getChildren(currentNode)

    for (let child of children) {
      groups.push(child, ...this._readFullTree(child))
    }
    return groups
  }

  getItemByPath(path: string): ComponentData | undefined {
    return this.dataByPath.get(path)
  }

  getParent(source: string) {
    if (!source.includes('.')) return undefined
    let parentPath = source.split('.').slice(0, -1).join('.')



    return this.dataByPath.get(parentPath)
  }

}
