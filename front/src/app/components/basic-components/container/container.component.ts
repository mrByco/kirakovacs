import { Component } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { DndDropEvent } from 'ngx-drag-drop';
import { ContainerC } from './container.type';
import { ComponentData } from '../../../../models/Data';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent extends BaseComponent<ContainerC> {



  onDragover(event: DragEvent) {

    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent) {

    let insertTo = event.index ?? 0
    let data: ComponentData = {
      userId: "1",
      classes: [],
      type: 'image',
      css: "",
      src: "https://via.placeholder.com/150",
    }
    this.data?.slot.splice(insertTo, 0, data)
    console.log("dropped", JSON.stringify(event, null, 2));
  }


  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    data: "myDragData",
    effectAllowed: "copy" as "copy",
    disable: false,
    handle: false
  };

  onDragStart(event: any) {

    console.log("drag started", JSON.stringify(event, null, 2));
    // remove locally
    let index = this.data?.slot.findIndex((item) => item == event.data)
    if (index && index != -1) {
      this.data?.slot.splice(index, 1)
    }

  }

  onDragEnd(event: any) {

    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {

    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {

    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent) {

    console.log("draggable moved", JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent) {

    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
}


