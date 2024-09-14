import { Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[appDynamic]',
})
export class DynamicDirective implements OnInit {
  @Input('appDynamic') componentType!: any
  @Input() props: any = {}

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    if (this.componentType) {
      this.loadComponent(this.componentType)
    }
  }

  public loadComponent(type: Type<unknown>) {
    const viewContainerRef = this.viewContainerRef
    viewContainerRef.clear()
    let ref = viewContainerRef.createComponent(type)

    Object.keys(this.props).forEach((key) => {
      ref.setInput(key, this.props[key])
    })
    return ref.instance
  }
}
