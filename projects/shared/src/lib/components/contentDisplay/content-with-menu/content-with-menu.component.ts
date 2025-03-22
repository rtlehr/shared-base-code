declare var bootstrap: any;

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { HtmlContentComponent } from '../../html-content/html-content/html-content.component';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';
import { ImageDisplayComponent } from '../../image-display/image-display.component';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { NewsComponent } from '../../news/news.component';
import { FaqComponent } from '../../faq/faq.component';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { InfoHighlightComponent } from '../../cards/info-highlight/info-highlight.component';
import { BusinessCardComponent } from '../../cards/business-card/business-card.component';
import { ContentTabsComponent } from '../../content-tabs/content-tabs.component';
import { RouterModule } from '@angular/router';
import { PermissionService } from '../../../services/permission.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { InfoCardsComponent } from '../../info-cards/info-cards.component';

@Component({
  selector: 'app-content-with-menu',
  standalone: true,
  imports: [
    CommonModule,
    HtmlContentComponent,
    ImageDisplayComponent,
    ImageGalleryComponent,
    ImageSliderComponent,
    NewsComponent,
    FaqComponent,
    FormGeneratorComponent,
    ContentTabsComponent,
    RouterModule,
    InfoHighlightComponent,
    BusinessCardComponent,
    InfoCardsComponent,
  ],
  templateUrl: './content-with-menu.component.html',
  styleUrl: './content-with-menu.component.scss'
})

export class ContentWithMenuComponent implements OnInit, OnDestroy {
  blogPost: BlogPost | null = null;
  blogPosts: BlogPost[] = [];
  error: string | null = null;
  baseBlogUrl: string = '';
  blogPostsUrl: string = '';
  permissions: string[] = [];
  currentBlogSlug: string = '';
  firstBlogPost: any;
slug: any;
cleanedPath: string = '';

  private routeSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //console.log("INIT ContentWithMenuComponent");
    this.permissions = this.permissionService.getPermissionsArray();

    this.routeSubscription = this.activatedRoute.paramMap.subscribe(params => {
      
      this.slug = params.get('url');
      //console.log("Slug: " + this.slug);

      // Construct the base URL from the current location path.
      const currentPath = this.location.path();
      //console.log("currentPath.length: " + currentPath.split('/').length);

      if(!this.slug)
      {
        this.cleanedPath = currentPath;
        this.baseBlogUrl = currentPath;
      }
      else
      {
        this.cleanedPath = currentPath.split('/').slice(0, -1).join('/');
        this.baseBlogUrl = this.cleanedPath;
      }
      
      //console.log("this.baseBlogUrl: " + this.baseBlogUrl);

      this.blogPostsUrl = `/assets/content/pages${this.cleanedPath}/content.json`;
      //console.log("this.blogPostsUrl: " + this.blogPostsUrl);
      //this.blogPostsUrl = `assets/content/pages/cms-information/component-samples/content.json`;
      //this.blogPostsUrl = 'assets/content/pages/blog/blog-posts.json';

      this.loadAllBlogPosts();

    });
  }

  private loadAllBlogPosts(): void {
    //console.log("**** Loading ALL Blog Post");
    this.blogService.getAllPosts(this.blogPostsUrl).subscribe({
      next: posts => {
        //console.log("Received posts:", posts);  // Debugging log
        if (Array.isArray(posts) && posts.length > 0) {
          this.blogPosts = posts;
          this.firstBlogPost = posts[0];
          //console.log("First Blog Post:", this.firstBlogPost); // Debugging log

          if (!this.slug) {
            this.slug = this.firstBlogPost.url;
            const url = [this.baseBlogUrl, this.slug];
            this.router.navigate(url);
          }
          this.currentBlogSlug = this.slug;
          //console.log("this.currentBlogSlug: "+ this.currentBlogSlug)
          this.loadBlogPost(this.currentBlogSlug);

        } else {
          console.warn("No blog posts received or empty array.");
          this.firstBlogPost = null;
        }
      },
      error: err => {
        console.error('Error loading blog posts', err);
        this.error = 'Failed to load blog posts: ' + err.message;
      }
    });
  }
  
  
  
  private loadBlogPost(slug: string): void {
    //console.log("**** Loading Blog Post");
      this.blogService.getPostByURL(this.blogPostsUrl, slug).subscribe({
      //this.blogService.getPostByURL(this.blogPostsUrl, 'content').subscribe({
      next: post => {
        //console.log("Loading Blog Post: " + this.blogPostsUrl);
        post.blogText = this.filterContentByPermissions(post.blogText, this.permissions);
        this.blogPost = post;
      },
      error: err => {
        console.error('Error loading blog post', err);
        this.error = 'Failed to load blog post';
      }
    });
  }

  filterContentByPermissions(contentArray: any[], permissions: string[]): any[] {
    return contentArray.filter(item => !item.permission || permissions.includes(item.permission));
  } 

  closeSidebar(): void {
    const sidebarElement = document.getElementById('sidebarMenu');
    if (sidebarElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarElement);
      bsOffcanvas?.hide();
    }
  }

  trackByBlogId(index: number, blog: BlogPost): number {
    return blog.id;
  }

  trackByContentId(index: number, content: any): number {
    return content.id;
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
