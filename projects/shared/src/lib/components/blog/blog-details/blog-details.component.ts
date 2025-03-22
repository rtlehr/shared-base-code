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

@Component({
  selector: 'app-blog-details',
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
  ],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
  providers: [BlogService],
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blogPost: BlogPost | null = null;
  blogPosts: BlogPost[] = [];
  error: string | null = null;
  baseBlogUrl: string = '';
  blogPostsUrl: string = '';
  permissions: string[] = [];
  currentBlogSlug: string = '';

  private routeSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.permissions = this.permissionService.getPermissionsArray();

    this.routeSubscription = this.activatedRoute.paramMap.subscribe(params => {
      const slug = params.get('url');
      if (!slug) {
        this.error = 'Invalid blog URL';
        return;
      }
      this.currentBlogSlug = slug;

      // Construct the base URL from the current location path.
      const currentPath = this.location.path();
      const cleanedPath = currentPath.split('/').slice(0, -1).join('/');
      this.baseBlogUrl = cleanedPath;
      this.blogPostsUrl = `assets/content/pages${cleanedPath}/blog-posts.json`;

      this.loadBlogPost(this.currentBlogSlug);
      this.loadAllBlogPosts();
    });
  }

  private loadBlogPost(slug: string): void {
    this.blogService.getPostByURL(this.blogPostsUrl, slug).subscribe({
      next: post => {
        post.blogText = this.filterContentByPermissions(post.blogText, this.permissions);
        this.blogPost = post;
      },
      error: err => {
        console.error('Error loading blog post', err);
        this.error = 'Failed to load blog post';
      }
    });
  }

  private loadAllBlogPosts(): void {
    this.blogService.getAllPosts(this.blogPostsUrl).subscribe({
      next: posts => (this.blogPosts = posts),
      error: err => {
        console.error('Error loading blog posts', err);
        this.error = 'Failed to load blog posts: ' + err.message;
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
