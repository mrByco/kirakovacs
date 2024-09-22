import { Component, EventEmitter, Input, Output } from '@angular/core';
import { screenSize } from '../../../../models/Data';

@Component({
  selector: 'app-screen-size-selector',
  templateUrl: './screen-size-selector.component.html',
  styleUrl: './screen-size-selector.component.scss'
})
export class ScreenSizeSelectorComponent {

  @Input() value: screenSize = 'default';
  @Output() valueChange: EventEmitter<screenSize> = new EventEmitter();

}
