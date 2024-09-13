import { SidebarService } from '../services/sidebar-service';
import { ComponentData } from './../../models/Data';
import { Directive, HostListener, inject, Input } from "@angular/core";
import { DynamicComponent } from './dynamic/dynamic.component';

@Directive({
})
export class BaseComponent<T extends ComponentData> {
  private sidebarService = inject(SidebarService)

  constructor() { }

  @Input()
  protected data: T | undefined = undefined;

  @HostListener('click', ["$event"])
  onClick($event: MouseEvent) {
    $event.stopPropagation()
    this.sidebarService.show(DynamicComponent.getComponentForType(this.data!.type))
  }
}
