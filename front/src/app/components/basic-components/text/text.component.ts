import { Component } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { TextC } from './text.type';



@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent extends BaseComponent<TextC> {

}
