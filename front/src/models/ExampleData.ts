import { RegisterContainer } from "../app/components/basic-components/container/container.type";
import { RegisterImage } from "../app/components/basic-components/image/image.type";
import { RegisterText } from "../app/components/basic-components/text/text.type";
import { ComponentData } from "./Data";


RegisterText();
RegisterContainer();
RegisterImage();


export const ExampleData: ComponentData = {
  userId: "1",
  type: "container",
  css: "container",
  direction: "row",
  align: "stretch",
  justify: "center",
  classes: [],
  slot: [
    {
      userId: "2",
      type: "text",
      css: "",
      classes: [],
      text: "Hello, World!"
    },
    {
      userId: "5",
      type: "container",
      css: "",
      classes: [],
      direction: "row",
      align: "stretch",
      justify: "center",
      slot: [
        {
          userId: "4",
          type: "text",
          css: "",
          classes: [],
          text: "Hello, World!"
        },
        {
          userId: "5",
          type: "image",
          css: "",
          classes: [],
          src: "https://via.placeholder.com/150"
        }
      ]
    },
    {
      userId: "3",
      type: "image",
      css: "",
      classes: [],
      src: "https://via.placeholder.com/150"
    }
  ]

}

