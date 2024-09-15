import { Component, Input, OnInit, Type } from '@angular/core';
import { ComponentRegistry } from '../../../component.registry';
import { ComponentData } from '../../../../../models/Data';

@Component({
  selector: 'app-new-elements',
  templateUrl: './new-elements.component.html',
  styleUrl: './new-elements.component.scss'
})
export class NewElementsComponent implements OnInit {

  @Input() data: ComponentData | undefined = undefined;

  public items: {
    name: string;
    component: Type<any>;
  }[] = []

  constructor() { }

  ngOnInit(): void {

    this.items = ComponentRegistry.GetToolbarItems()

  }

}
