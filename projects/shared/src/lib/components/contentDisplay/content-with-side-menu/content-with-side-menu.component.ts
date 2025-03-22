declare var bootstrap: any;

import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { pageContent } from '../../../models/page-content.model';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-content-with-side-menu', 
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './content-with-side-menu.component.html',
  styleUrl: './content-with-side-menu.component.scss'
})
export class ContentWithSideMenuComponent { 

  pageContent: pageContent [] = [];
 
  divId: String = "";

  parentPath: string = "";

  childrenPaths: any[] = [];

  childrenTitle: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {}

  ngOnInit()
  {
      const parentRoute = this.activatedRoute;

      if (parentRoute && parentRoute.routeConfig) {

        this.parentPath = parentRoute.routeConfig?.path || ""; 

        // Safely access children of the parent route
        const parentRouteChildren = parentRoute.routeConfig?.children || [];

        parentRouteChildren.forEach((child) => {

          console.log("from content side child.path: " + child.path);

          this.childrenPaths.push({ 
            title: child.title,
            path: child.path
          });

        });
      }
      
      //this.pageContent = this.activatedRoute.snapshot.data['pageContent']; 

      const currentRoutePath = this.activatedRoute.snapshot.routeConfig?.path || "";

      // Generate the dynamic div ID by concatenating "-div"
      this.divId = `${currentRoutePath}-div`;

      console.log("this.divID: " + this.divId);

      const currPath = this.location.path();

      const currPathArray = currPath.split("/");

      if(currPathArray.length <= 3)
      {

        this.router.navigate([currPath + "/" + this.childrenPaths[0].path]);

      }
    
  }

  closeSidebar() {
    const sidebarElement = document.getElementById('sidebarMenu');
    if (sidebarElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide(); // Properly close offcanvas
      }
    }
  }
  

}
