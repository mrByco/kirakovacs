import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getDefaultResponsiveProp, ResponiveProp } from '../../../../../models/Data';

@Component({
  selector: 'app-margin-padding-edit',
  templateUrl: './margin-padding-edit.component.html',
  styleUrl: './margin-padding-edit.component.scss'
})
export class MarginPaddingEditComponent {

  @Input() value: ResponiveProp<string> | undefined = getDefaultResponsiveProp<string>("");
  @Output() valueChange = new EventEmitter<ResponiveProp<string>>();




}
