import { Component } from '@angular/core';
import { BaseEditorComponent } from '../../../base-editor-component';
import { ImageC } from '../image.component';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.scss'
})
export class ImageEditorComponent extends BaseEditorComponent<ImageC> {

}
