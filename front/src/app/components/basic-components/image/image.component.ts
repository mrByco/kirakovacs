import { Component } from '@angular/core';
import { BaseComponent as BaseComponent } from '../../base-component';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { ComponentRegistry } from '../../component.registry';
import { ImageC } from './image.type';
import { getDefaultBaseComponentData } from '../../../../models/Data';



@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent extends BaseComponent<ImageC> {

}

ComponentRegistry.registerComponent('image', {
  component: ImageComponent,
  editor: ImageEditorComponent,
  createNew: () => {
    return {
      ...getDefaultBaseComponentData(),
      type: "image",
      src: ""
    }
  }
})
