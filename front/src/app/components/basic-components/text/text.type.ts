import { BaseComponentData, getDefaultBaseComponentData } from "../../../../models/Data";
import { ComponentRegistry } from "../../component.registry";
import { TextEditorComponent } from "./text-editor/text-editor.component";
import { TextComponent } from "./text.component";


export interface TextC extends BaseComponentData {
  type: "text";
  text: string;
}

export function RegisterText() {
  ComponentRegistry.registerComponent('text',
    {
      component: TextComponent,
      editor: TextEditorComponent,
      createNew: () => {
        return {
          ...getDefaultBaseComponentData(),
          type: "text",
          text: "New Text"
        }
      }
    }
  )
}

RegisterText()
