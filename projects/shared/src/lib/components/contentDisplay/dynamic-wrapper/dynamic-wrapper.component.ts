import { Component, Input, ViewChild, ViewContainerRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dynamic-wrapper',
  standalone: true,
  template: `<ng-template #container></ng-template>`
})
export class DynamicWrapperComponent implements OnInit, OnChanges {
  @Input() component!: any;
  @Input() inputs!: { [key: string]: any };

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  componentRef: any;

  ngOnInit(): void {
    console.log('Dynamic component to load:', this.component);
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.componentRef && changes['inputs']) {
      Object.assign(this.componentRef.instance, this.inputs);
    }
  }

  loadComponent(): void {
    console.log("loadComponent")
    this.container.clear();
    // Dynamically create the component using the Ivy API.
    this.componentRef = this.container.createComponent(this.component);
    if (this.inputs) {
      Object.assign(this.componentRef.instance, this.inputs);
    }
  }
}
