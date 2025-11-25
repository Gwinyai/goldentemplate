import React from "react";
import Link from "next/link";
import { Badge, Button } from "@/components/ui";

interface BlogPostProps {
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    title?: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: string;
  tags?: string[];
  image?: {
    src: string;
    alt: string;
  };
  shareUrls?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function BlogPost({
  title,
  excerpt,
  content,
  author,
  publishedAt,
  updatedAt,
  readingTime,
  category,
  tags,
  image,
  shareUrls,
}: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{category}</Badge>
          <span className="text-sm text-muted-foreground">
            {readingTime} min read
          </span>
        </div>
        
        <h1 className="text-4xl font-heading font-bold tracking-tight mb-4">
          {title}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-6">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}
              
              <div>
                <div className="font-medium">{author.name}</div>
                {author.title && (
                  <div className="text-sm text-muted-foreground">
                    {author.title}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <div>Published {formatDate(publishedAt)}</div>
            {updatedAt && updatedAt !== publishedAt && (
              <div>Updated {formatDate(updatedAt)}</div>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {image && (
        <div className="mb-8">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full aspect-[16/9] object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm bg-muted hover:bg-accent px-3 py-1 rounded-full transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      {shareUrls && (
        <div className="border-t pt-8 mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Share this post
          </h3>
          <div className="flex gap-2">
            {shareUrls.twitter && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
              </Button>
            )}
            
            {shareUrls.linkedin && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={shareUrls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </Button>
            )}
            
            {shareUrls.facebook && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Author Bio */}
      {author.bio && (
        <div className="border-t pt-8">
          <div className="flex gap-4">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="h-16 w-16 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-medium">
                  {author.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div>
              <h3 className="font-semibold text-lg mb-1">
                About {author.name}
              </h3>
              {author.title && (
                <p className="text-sm text-muted-foreground mb-2">
                  {author.title}
                </p>
              )}
              <p className="text-muted-foreground">
                {author.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}