import { Component } from '@angular/core';
import { BaseComponentData } from '../../../../models/Data';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { BaseComponent as BaseComponent } from '../../base-component';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { ComponentRegistry } from '../../component.registry';

export interface ImageC extends BaseComponentData {
  type: "image";
  src: string;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent extends BaseComponent<ImageC> {

}

ComponentRegistry.registerComponent('image', {
  component: ImageComponent,
  editor: ImageEditorComponent
})
