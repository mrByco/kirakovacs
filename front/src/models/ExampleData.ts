import { RegisterContainer } from "../app/components/basic-components/container/container.type";
import { RegisterImage } from "../app/components/basic-components/image/image.type";
import { RegisterText } from "../app/components/basic-components/text/text.type";
import { ComponentData, getDefaultBaseComponentData, getDefaultResponsiveProp } from "./Data";


RegisterText();
RegisterContainer();
RegisterImage();


export const ExampleData: ComponentData = {
  userId: "1",
  type: "container",
  direction: getDefaultResponsiveProp("row"),
  align: getDefaultResponsiveProp("stretch"),
  justify: getDefaultResponsiveProp("center"),
  classes: [],
  slot: [
    {
      userId: "2",
      type: "text",
      classes: [],
      text: { hu: "Hello, World!" }
    },
    {
      userId: "5",
      type: "container",
      classes: [],
      direction: getDefaultResponsiveProp("column"),
      align: getDefaultResponsiveProp("stretch"),
      justify: getDefaultResponsiveProp("center"),
      slot: [
        {
          userId: "4",
          type: "text",
          classes: [],
          text: { hu: "Hello, World!" }
        },
        {
          userId: "5",
          type: "image",
          classes: [],
          src: "https://via.placeholder.com/150"
        }
      ]
    },
    {
      userId: "3",
      type: "image",
      classes: [],
      src: "https://via.placeholder.com/150"
    }
  ]

}

