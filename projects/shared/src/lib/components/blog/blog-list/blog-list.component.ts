import { Component, OnInit, Input, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';
import { ModalWindowService } from '../../../services/modal-window.service';

interface pageContent {
  contentType: string;
  contentFile: string;
  divId: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html', 
  styleUrls: ['./blog-list.component.scss'],
  providers: [BlogService],
})
export class BlogListComponent implements OnInit {

  constructor(private blogService: BlogService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private modalWindowService: ModalWindowService) {}

  @Input() fileToLoad = '';

  pageContent: pageContent[] = []; 

  divId: String = "";

  blogPosts: BlogPost[] = [];

  error: string | null = null;

  isVisible: boolean = false;

  @ViewChildren('blogItem') blogDivs!: QueryList<ElementRef>;

  showFeaturedOnly: boolean = false; // Flag for toggling featured posts

  ngOnInit(): void {
    this.pageContent = this.activatedRoute.snapshot.data['pageContent']; 

    this.divId = this.pageContent[0].divId;

    this.getAllPosts();
  }

 // ngAfterViewInit(): void {

    //console.log("ngAfterViewInit");

   /* this.blogDivs.changes.subscribe(() => {
      console.log("this.blogDivs.length: " + this.blogDivs.length);
      console.log("this.blogPosts.length: " + this.blogPosts.length);
      if (this.blogDivs.length === this.blogPosts.length) {

        this.onAllPostsRendered();
      }

   });*/

  //}

  getAllPosts(): void {
    this.blogService.getAllPosts(this.pageContent[0].contentFile).subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        setTimeout(() => this.onAllPostsRendered());
      },
      error: (err) => {
        this.error = 'Failed to load blog posts: ' + err.message;
      },
    });
  }

  getFeaturedPosts(): void {

    this.blogService.getFeaturedPosts(this.pageContent[0].contentFile).subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        setTimeout(() => this.onAllPostsRendered());
      },
      error: (err) => {
        this.error = 'Failed to load blog posts: ' + err.message;
      },
    });

  }

  getTagPosts(tag: string): void {
    
    this.removeVisible();

    this.showFeaturedOnly = true;

    this.blogService.getPostsByTag(this.pageContent[0].contentFile, tag).subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        setTimeout(() => this.onAllPostsRendered());
      },
      error: (err) => {
        this.error = 'Failed to load blog posts: ' + err.message;
      },
    });
  }

  removeVisible(): void {
    this.blogDivs.forEach((div) => {
      div.nativeElement.classList.remove('visible');
    });
  }

  toggleShowAllButton(): void {

      this.showFeaturedOnly = !this.showFeaturedOnly;

  }

  toggleFeaturedPosts(): void {

    this.removeVisible();

    this.toggleShowAllButton();
    
    if (this.showFeaturedOnly) {
      this.getFeaturedPosts(); // Show featured posts only
    } else {
      this.getAllPosts(); // Show all posts
    }
  }

  onAllPostsRendered(): void {
    this.blogDivs.forEach((div, index) => {
      setTimeout(() => {
        div.nativeElement.classList.add('visible');
      }, index * 100);
    });
  }

  navigateToDetails(url: string): void {
    const currurl = this.location.path();
    this.router.navigate([currurl, url]);
  }

  openModalWindow(modalContent: any) {

    console.log("openModalWindow from blog-list component");

    this.modalWindowService.openModalWindow(modalContent);
  }

}
