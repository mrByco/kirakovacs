import { ContainerC } from "../app/components/basic-components/container/container.type";
import { ImageC } from "../app/components/basic-components/image/image.type";
import { TextC } from "../app/components/basic-components/text/text.type";


export type ComponentData = TextC | ImageC | ContainerC;

export interface BaseComponentData {
  userId: string;
  path?: string;
  type: string;
  css: string;
  classes: string[];
}





