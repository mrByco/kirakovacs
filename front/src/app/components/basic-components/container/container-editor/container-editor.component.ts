import { Component } from '@angular/core';
import { BaseEditorComponent } from '../../../base-editor-component';
import { ContainerC } from '../container.type';
import { faDownLong, faRightLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-container-editor',
  templateUrl: './container-editor.component.html',
  styleUrl: './container-editor.component.scss'
})
export class ContainerEditorComponent extends BaseEditorComponent<ContainerC> {

  protected readonly faRightLong = faRightLong
  protected readonly faDownLong = faDownLong



}
