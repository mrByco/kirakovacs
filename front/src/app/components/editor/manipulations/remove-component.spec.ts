import { ComponentData } from "../../../../models/Data";
import { ExampleData } from "../../../../models/ExampleData";
import { MaintainAllComponentData } from "../data-maintainer";
import { AddComponentData } from "./add-component";
import { RemoveComponentData } from "./remove-component";

describe("RemoveComponent", () => {

  let data: ComponentData;

  beforeEach(() => {
    data = JSON.parse(JSON.stringify(ExampleData));
  });

  it('should remove component at index', () => {
    MaintainAllComponentData(data);

    RemoveComponentData(data, '1.2');

    let dataAny = data as any;
    expect(dataAny.slot[0].userId).toBe('5')
  })

  /*it('should add new component if the user id already exist', () => {
    MaintainAllComponentData(data);

    let added = AddComponentData(data, 'image', '1', 1);
    let added2 = AddComponentData(data, 'image', '1', 1);

    let dataAny = data as any;
    expect(dataAny.slot[2].type).toBe('image')
    expect(dataAny.slot[2].userId).toBe(added.userId);

    expect(added2.userId).toBe(added.userId + '-1');
  }
  )*/

});
