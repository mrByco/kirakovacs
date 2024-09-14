import { ContainerC } from "../app/components/basic-components/container/container.component";
import { ImageC } from "../app/components/basic-components/image/image.component";
import { TextC } from "../app/components/basic-components/text/text.component";

export type ComponentData = TextC | ImageC | ContainerC;

export interface BaseComponentData {
  userId: string;
  path?: string;
  type: string;
  css: string;
  classes: string[];
}





