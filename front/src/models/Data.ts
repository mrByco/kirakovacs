import { ContainerC } from "../app/components/basic-components/container/container.type";
import { ImageC } from "../app/components/basic-components/image/image.type";
import { TextC } from "../app/components/basic-components/text/text.type";


export type ComponentData = TextC | ImageC | ContainerC;

export interface BaseComponentData {
  userId: string;
  path?: string;
  type: string;


  css?: ResponiveProp<string>;
  classes?: ResponiveProp<string[]>;
  margin?: ResponiveProp<string>;
  padding?: ResponiveProp<string>;

}

export type screenSize = "mobile" | "tablet" | "default";
export type ResponiveProp<T> = { key: screenSize, value: T }[];

export function getDefaultResponsiveProp<T>(defaultValue: T): ResponiveProp<T> {
  return [{
    key: "default",
    value: defaultValue
  }]
}

export function getMobile<T>(data: ResponiveProp<T> | undefined): T | undefined {
  if (!data) return;
  let v = data.find(x => x.key === "mobile")?.value;
  if (!v) {
    v = data.find(x => x.key === 'default')?.value;
  }
  return v;
}

export function getTablet<T>(data: ResponiveProp<T> | undefined): T | undefined {
  if (!data) return;
  let v = data.find(x => x.key === "tablet")?.value;
  if (!v) {
    v = data.find(x => x.key === 'default')?.value;
  }
  return v;
}

export function getDefault<T>(data: ResponiveProp<T> | undefined): T | undefined {
  if (!data) return;
  let v = data.find(x => x.key === "default")?.value;
  return v;
}

export function getDefaultBaseComponentData(): BaseComponentData {
  return {
    userId: "component",
    type: "text",
    css: getDefaultResponsiveProp(""),
    classes: getDefaultResponsiveProp([]),
    margin: getDefaultResponsiveProp(""),
    padding: getDefaultResponsiveProp(""),
  }
}



