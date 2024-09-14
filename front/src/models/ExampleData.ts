import { MaintainAllComponentData } from "../app/components/editor/data-maintainer";
import { ComponentData } from "./Data";

export const ExampleData: ComponentData = {
  userId: "1",
  type: "container",
  css: "container",
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
      userId: "3",
      type: "container",
      css: "",
      classes: [],
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

