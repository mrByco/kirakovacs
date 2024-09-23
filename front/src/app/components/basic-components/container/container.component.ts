import { AfterViewInit, Component, DoCheck, ElementRef, Inject, inject, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { DndDropEvent } from 'ngx-drag-drop';
import { ContainerC } from './container.type';
import { getDefault, getMobile } from '../../../../models/Data';
import { MoveComponentData } from '../../editor/manipulations/move-component';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent extends BaseComponent<ContainerC> implements AfterViewInit, DoCheck {
  ngDoCheck(): void {
    this.setStyle();
  }

  public dynamicStylePath: string = '';

  private setStyle() {
    this.dynamicStylePath = `styled-container-${this.data?.path?.replaceAll('.', '-')}`;

    try {
      let style = this.elementRef.nativeElement.querySelector(`[id="style-${this.dynamicStylePath}"]`);
      if (style) {
        this.renderer.removeChild(this.elementRef.nativeElement, style);
      }
    }
    catch (e) {
      // we are on server
    }

    let style = this.renderer.createElement('style');

    this.renderer.setAttribute(style, 'id', `style-${this.dynamicStylePath}`);

    // Define dynamic CSS rules
    const dynamicStyles = `
      .${this.dynamicStylePath} {
        flex-direction: ${getMobile(this.data?.direction)};
        align-items: ${getMobile(this.data?.align)};
        justify-content: ${getMobile(this.data?.justify)};
      }

      @media (min-width: 0px) {
        .${this.dynamicStylePath} {
          flex-direction: ${getDefault(this.data?.direction)};
          align-items: ${getDefault(this.data?.align)};
          justify-content: ${getDefault(this.data?.justify)};
        }
      }
    `;


    // Inject the styles into the <style> element
    const text = this.renderer.createText(dynamicStyles);
    this.renderer.appendChild(style, text);

    // Append the <style> element to the component's view
    this.renderer.appendChild(this.elementRef.nativeElement, style);
  }

  ngAfterViewInit(): void {
  }

  onDragover(event: DragEvent) {

    //console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent) {

    console.log("dropped", JSON.stringify(event, null, 2));
    let droppedData = event.data;

    if (typeof droppedData === 'string') {
      this.editor.createNewComponent(droppedData, this.data?.path!, event.index);
    }
    if (!this.editor.data || !event.data?.path) {
      return
    }

    MoveComponentData(this.editor.data, event.data.path, this.data?.path!, event.index)

    //console.log("dropped", JSON.stringify(event, null, 2));
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

    //console.log("drag started", JSON.stringify(event, null, 2));
    // remove locally
    let index = this.data?.slot.findIndex((item) => item == event.data)
    if (index && index != -1) {
      this.data?.slot.splice(index, 1)
    }

    console.log("drag started", JSON.stringify(event, null, 2));

  }

  onDragEnd(event: any) {

    //console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {

    //console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {

    //console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent) {

    console.log("draggable moved", JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent) {

    //console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  getPositioningCss() {
    let css = '';
    /*if (this.data?.direction) {
      css += `flex-direction: ${this.data.direction};`
    }*/

    if (this.data?.align) {
      css += `align-items: ${this.data.align};`
    }

    if (this.data?.justify) {
      css += `justify-content: ${this.data.justify};`
    }
    return css;
  }
}


