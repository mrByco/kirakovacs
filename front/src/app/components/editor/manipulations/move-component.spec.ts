import { ComponentData } from "../../../../models/Data";
import { ExampleData } from "../../../../models/ExampleData";
import { MaintainAllComponentData } from "../data-maintainer";
import { MoveComponentData } from "./move-component";


describe('DataMaintainer', () => {
  let data: ComponentData;

  beforeEach(() => {
    data = JSON.parse(JSON.stringify(ExampleData));
  });

  it('should reorder components', () => {
    MaintainAllComponentData(data);

    MoveComponentData(data, '1.3', '1');

    let dataAny = data as any;
    expect(dataAny.slot[0].path).toBe('1.3');
    expect(dataAny.slot[1].path).toBe('1.2');
  })

  it('should move components accross different layers', () => {
    MaintainAllComponentData(data);

    MoveComponentData(data, '1.5.4', '1', 1);

    let dataAny = data as any;
    expect(dataAny.slot[1].path).toBe('1.4');
  })
});
