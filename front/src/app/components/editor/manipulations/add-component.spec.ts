import { ComponentData } from "../../../../models/Data";
import { ExampleData } from "../../../../models/ExampleData";
import { MaintainAllComponentData } from "../data-maintainer";
import { AddComponentData } from "./add-component";
import { MoveComponentData } from "./move-component";

describe("AddComponent", () => {

  let data: ComponentData;

  beforeEach(() => {
    data = JSON.parse(JSON.stringify(ExampleData));
  });

  it('should add new component at index', () => {
    MaintainAllComponentData(data);

    let added = AddComponentData(data, 'image', '1', 1);

    let dataAny = data as any;
    expect(dataAny.slot[1].type).toBe('image')
    expect(dataAny.slot[1].userId).toBe(added.userId);
  })

  it('should add new component if the user id already exist', () => {
    MaintainAllComponentData(data);

    let added = AddComponentData(data, 'image', '1', 1);
    let added2 = AddComponentData(data, 'image', '1', 1);

    let dataAny = data as any;
    expect(dataAny.slot[2].type).toBe('image')
    expect(dataAny.slot[2].userId).toBe(added.userId);

    expect(added2.userId).toBe(added.userId + '-1');
  }
  )

});
