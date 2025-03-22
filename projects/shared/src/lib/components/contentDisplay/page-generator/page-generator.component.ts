import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HtmlContentComponent } from '../../html-content/html-content/html-content.component';
import { ImageGalleryComponent } from "../../image-gallery/image-gallery.component";
import { NewsComponent } from '../../news/news.component';
import { FaqComponent } from '../../faq/faq.component';
import { ImageDisplayComponent } from '../../image-display/image-display.component';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { ContentTabsComponent } from '../../content-tabs/content-tabs.component';
import { BlogListComponent } from '../../blog/blog-list/blog-list.component'; 
import { InfoHighlightComponent } from '../../cards/info-highlight/info-highlight.component';
import { BusinessCardComponent } from '../../cards/business-card/business-card.component';
import { InfoCardsComponent } from '../../info-cards/info-cards.component';
import { pageContent } from '../../../models/page-content.model';
import { PermissionService } from '../../../services/permission.service';

// Import the dynamic wrapper component
import { DynamicWrapperComponent } from '../dynamic-wrapper/dynamic-wrapper.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-generator',
  standalone: true, 
  imports: [
    HtmlContentComponent,
    ImageGalleryComponent,
    NewsComponent,
    FaqComponent,
    ImageDisplayComponent,
    FormGeneratorComponent,
    ImageSliderComponent,
    ContentTabsComponent,
    BlogListComponent,
    InfoHighlightComponent,
    BusinessCardComponent,
    InfoCardsComponent,
    CommonModule,
    DynamicWrapperComponent  // Include the wrapper in your component’s imports
  ],
  templateUrl: './page-generator.component.html',
  styleUrls: ['./page-generator.component.scss']
})
export class PageGeneratorComponent implements OnInit {

  divId: string = "";
  
  // Renamed for clarity; holds the list of content items for the page.
  pageContents: pageContent[] = [];

  // Assuming permissions are represented as strings.
  permissions: string[] = [];

  // Mapping of content types to component classes.
  componentMapping: { [key: string]: any } = {
    contentPage: HtmlContentComponent,
    imageGallery: ImageGalleryComponent,
    news: NewsComponent,
    faq: FaqComponent,
    imageDisplay: ImageDisplayComponent,
    form: FormGeneratorComponent,
    imageSlider: ImageSliderComponent,
    tabs: ContentTabsComponent,
    blog: BlogListComponent,
    infoHighlight: InfoHighlightComponent,
    businesscard: BusinessCardComponent,
    InfoCards: InfoCardsComponent
  };

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private permissionService: PermissionService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    // Retrieve permissions.
    this.permissions = this.permissionService.getPermissionsArray();
    console.log("Permissions", this.permissions);

    // Retrieve page content data from the activated route and filter by permissions.
    const routeData = this.activatedRoute.snapshot.data['pageContent'];
    if (Array.isArray(routeData)) {
      this.pageContents = this.filterContentByPermissions(routeData, this.permissions);
    } else {
      console.warn('No pageContent data found in route snapshot');
    }

    // Create a dynamic divId based on the current route.
    const currentRoutePath = this.activatedRoute.snapshot.routeConfig?.path || "";
    this.divId = `${currentRoutePath}-div`;
    console.log('Dynamic Div ID:', this.divId);
  }

  filterContentByPermissions(contentArray: pageContent[], permissions: string[]): pageContent[] {
    return contentArray.filter(item => {
      // Include content if it has no associated permission or if the required permission is present.
      return !item.permission || permissions.includes(item.permission);
    });
  }
}
