import { Component, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {

  menuItems: any[] = [];

  constructor(private http: HttpClient, private router: Router) {} 

  @Output() parentEvent = new EventEmitter<string>();

  ngOnInit(): void {
    const routes = this.router.config; 
    this.menuItems = this.extractMenuItems(routes);
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

  get getHeaderMenuItems() {
    return this.menuItems;
  }

  closeMenu() {
    if (window.innerWidth < 992) { // Bootstrap breakpoint for 'lg' screens (992px)
      const navbarToggler = document.querySelector('.navbar-collapse');
      if (navbarToggler) {
        (navbarToggler as HTMLElement).classList.remove('show');
      }
    }
  }

}
