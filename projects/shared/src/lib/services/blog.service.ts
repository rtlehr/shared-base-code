// blog.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches all blog posts.
   * @param blogPostsUrl The URL of the blog posts JSON file.
   * @returns An Observable of BlogPost array.
   */
  getAllPosts(blogPostsUrl: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(blogPostsUrl);
  }

  /**
   * Fetches a single blog post by ID.
   * @param blogPostsUrl The URL of the blog posts JSON file.
   * @param id The ID of the blog post.
   * @returns An Observable of BlogPost.
   */
  getPostById(blogPostsUrl: string, id: number): Observable<BlogPost> {
    return this.http.get<BlogPost[]>(blogPostsUrl).pipe(
      map(posts => posts.find(post => post.id === id)!)
    );
  }

  /**
   * Fetches featured blog posts.
   * @param blogPostsUrl The URL of the blog posts JSON file.
   * @returns An Observable of BlogPost array.
   */
  getFeaturedPosts(blogPostsUrl: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(blogPostsUrl).pipe(
      map(posts => posts.filter(post => post.isFeatured))
    );
  }

  /**
   * Fetches blog posts by a specific tag.
   * @param blogPostsUrl The URL of the blog posts JSON file.
   * @param tag The tag to filter by.
   * @returns An Observable of BlogPost array.
   */
  getPostsByTag(blogPostsUrl: string, tag: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(blogPostsUrl).pipe(
      map(posts => posts.filter(post => post.tags.includes(tag)))
    );
  }

  getPostByURL(blogPostsUrl: string, url: string): Observable<BlogPost> {
    return this.http.get<BlogPost[]>(blogPostsUrl).pipe(
      map(posts => posts.find(post => post.url === url)!)
    );
  }
  
}
