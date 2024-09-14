import { BaseComponentData } from "../../../../models/Data";
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
    editor: ImageEditorComponent
  })
}

RegisterImage()
