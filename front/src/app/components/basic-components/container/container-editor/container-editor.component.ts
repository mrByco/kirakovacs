import { Component } from '@angular/core';
import { ContainerC } from '../container.component';
import { BaseEditorComponent } from '../../../base-editor-component';

@Component({
  selector: 'app-container-editor',
  templateUrl: './container-editor.component.html',
  styleUrl: './container-editor.component.scss'
})
export class ContainerEditorComponent extends BaseEditorComponent<ContainerC> {

}
