import { ComponentData } from "../../../models/Data";

import { ExampleData } from "../../../models/ExampleData";
import { RegisterContainer } from "../basic-components/container/container.type";
import { RegisterImage } from "../basic-components/image/image.type";
import { RegisterText } from "../basic-components/text/text.type";
import { MaintainAllComponentData } from "./data-maintainer";

describe('DataMaintainer', () => {
  let data: ComponentData;

  beforeEach(() => {
    data = JSON.parse(JSON.stringify(ExampleData));
  });

  it('should fix component paths', () => {
    MaintainAllComponentData(data);
    expect(data.path).toBe(data.userId);
    let dataAny = data as any;
    dataAny.slot[0].path = '1.2';
    dataAny.slot[1].path = '1.3';
    dataAny.slot[1][0] = '1.3.4';
  })
});
