import { BaseComponentData, getDefaultBaseComponentData } from "../../../../models/Data";
import { LanguageString } from "../../../../models/LanguageString";
import { ComponentRegistry } from "../../component.registry";
import { TextEditorComponent } from "./text-editor/text-editor.component";
import { TextComponent } from "./text.component";


export interface TextC extends BaseComponentData {
  type: "text";
  text: LanguageString;
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
          text: { hu: 'SampleText' }
        }
      }
    }
  )
}

RegisterText()
