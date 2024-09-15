import { BaseComponentData, getDefaultBaseComponentData } from "../../../../models/Data";
import { ComponentRegistry } from "../../component.registry";
import { ImageEditorComponent } from "./image-editor/image-editor.component";
import { ImageComponent } from "./image.component";

export interface ImageC extends BaseComponentData {
  type: "image";
  src: string;
}

export function RegisterImage() {
  ComponentRegistry.registerComponent('image', {
    component: ImageComponent,
    editor: ImageEditorComponent,
    createNew: () => {
      return {
        ...getDefaultBaseComponentData(),
        type: "image",
        src: "https://via.placeholder.com/300"
      }

    }
  })
}

RegisterImage()
