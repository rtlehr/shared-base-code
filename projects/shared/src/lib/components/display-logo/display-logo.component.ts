import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-logo',
  standalone: true,
  imports: [],
  templateUrl: './display-logo.component.html',
  styleUrl: './display-logo.component.css'
})
export class DisplayLogoComponent {

  @Input() src: string = '' 
  @Input() width: string = ''
  @Input() height: string = ''

  @Output() parentEvent = new EventEmitter<string>();

  headerMenuItems: any[] = [];

  menuItems: any[] = [];

  config: any;

  constructor(private router: Router) {} 

  ngOnInit(): void {

    const routes = this.router.config; 

    this.menuItems = this.extractMenuItems(routes);
    
  }

  goHome(event: Event)
  {

    this.router.navigate([this.menuItems[0].path]);

    }

    private extractMenuItems(routes: any[]): any[] {

      return routes
        .filter((route) => route.data?.menu) // Include only routes with `menu: true`
        .map((route) => ({
          title: route.title,
          path: route.path,
          children: route.children ? this.extractMenuItems(route.children) : null,
        }));
  
    }


}
