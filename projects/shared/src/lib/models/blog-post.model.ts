export interface BlogPost {
    id: number;              // Unique identifier for the blog post
    url: string;              //The URL for this blog entry
    title: string;           // Title of the blog post
    content: string;         // Full content of the blog post
    author: string;          // Author's name
    date: string;            // Date of publication (ISO 8601 format preferred)
    tags: string[];          // List of tags associated with the post (used for categorization and filtering)
    imageUrl?: string;       // URL of the header or thumbnail image (optional)
    isFeatured: boolean;     // Indicates if the post is featured
    blogText: any[];
  }