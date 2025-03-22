import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class RouteInfoService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  /**
   * Returns the current route snapshot.
   */
  getCurrentRoute(): ActivatedRouteSnapshot {
    return this.activatedRoute.snapshot;
  }

  /**
   * Returns the full URL of the current route.
   */
  getCurrentUrl(): string {
    return this.router.url;
  }

  /**
   * Returns the path of the current route.
   */
  getCurrentPath(): string | null {
    return this.activatedRoute.snapshot.routeConfig?.path || null;
  }

  /**
   * Returns the children of the current route.
   */
  getCurrentRouteChildren(): ActivatedRouteSnapshot[] {
    return this.activatedRoute.snapshot.children || [];
  }

  /**
   * Returns the children of a given route.
   */
  getRouteChildren(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot[] {
    return route.children || [];
  }

  /**
   * Returns route data (e.g., title, metadata) from the current route.
   */
  getCurrentRouteData(): { [key: string]: any } {
    return this.activatedRoute.snapshot.data || {};
  }

  /**
   * Returns specific metadata (e.g., title) from the current route's data.
   */
  getCurrentRouteMeta(key: string): any {
    return this.getCurrentRouteData()[key];
  }

  /**
   * Returns the parent route of the current route, if it exists.
   */
  getParentRoute(): ActivatedRouteSnapshot | null {
    return this.activatedRoute.snapshot.parent || null;
  }

  /**
   * Retrieves information about a given route (e.g., path, title, and data).
   */
  getRouteInfo(route: ActivatedRouteSnapshot): { path: string | null; data: any } {
    return {
      path: route.routeConfig?.path || null,
      data: route.data || {},
    };
  }

  /**
   * Navigates to a given route programmatically.
   */
  navigateToRoute(commands: any[], extras: any = {}): void {
    this.router.navigate(commands, extras);
  }

  /**
   * Builds a full URL path for a given route by walking up its parents.
   */
  buildFullRoutePath(route: ActivatedRouteSnapshot): string {
    const paths: string[] = [];
    let currentRoute: ActivatedRouteSnapshot | null = route;

    while (currentRoute) {
      const path = currentRoute.routeConfig?.path;
      if (path) paths.unshift(path);
      currentRoute = currentRoute.parent || null;
    }

    return `/${paths.join('/')}`;
  }
}
