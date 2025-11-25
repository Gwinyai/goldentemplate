import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@/components/ui";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTime: number;
  category: string;
  tags?: string[];
  featured?: boolean;
  image?: {
    src: string;
    alt: string;
  };
}

interface BlogSectionProps {
  title: string;
  subtitle?: string;
  posts: BlogPost[];
  layout?: "grid" | "list";
  showExcerpts?: boolean;
  showCategories?: boolean;
  showAuthors?: boolean;
  showReadingTime?: boolean;
  maxPosts?: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function BlogSection({
  title,
  subtitle,
  posts,
  layout = "grid",
  showExcerpts = true,
  showCategories = true,
  showAuthors = true,
  showReadingTime = true,
  maxPosts,
}: BlogSectionProps) {
  const displayPosts = maxPosts ? posts.slice(0, maxPosts) : posts;

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Posts */}
        {layout === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                showExcerpts={showExcerpts}
                showCategories={showCategories}
                showAuthors={showAuthors}
                showReadingTime={showReadingTime}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {displayPosts.map((post, index) => (
              <BlogListItem
                key={post.slug}
                post={post}
                showExcerpts={showExcerpts}
                showCategories={showCategories}
                showAuthors={showAuthors}
                showReadingTime={showReadingTime}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BlogCard({
  post,
  showExcerpts,
  showCategories,
  showAuthors,
  showReadingTime,
}: {
  post: BlogPost;
  showExcerpts: boolean;
  showCategories: boolean;
  showAuthors: boolean;
  showReadingTime: boolean;
}) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
          <img
            src={post.image.src}
            alt={post.image.alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {showCategories && (
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          )}
          {post.featured && (
            <Badge className="text-xs">Featured</Badge>
          )}
        </div>
        
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        
        {showExcerpts && (
          <CardDescription className="line-clamp-3">
            {post.excerpt}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {showAuthors && (
              <div className="flex items-center gap-2">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span>{formatDate(post.publishedAt)}</span>
            {showReadingTime && (
              <span>• {post.readingTime} min read</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BlogListItem({
  post,
  showExcerpts,
  showCategories,
  showAuthors,
  showReadingTime,
}: {
  post: BlogPost;
  showExcerpts: boolean;
  showCategories: boolean;
  showAuthors: boolean;
  showReadingTime: boolean;
}) {
  return (
    <article className="flex gap-6 p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
      {post.image && (
        <div className="flex-shrink-0">
          <div className="w-48 h-32 overflow-hidden rounded-lg">
            <img
              src={post.image.src}
              alt={post.image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          {showCategories && (
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          )}
          {post.featured && (
            <Badge className="text-xs">Featured</Badge>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        
        {showExcerpts && (
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {showAuthors && (
              <div className="flex items-center gap-2">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span>{formatDate(post.publishedAt)}</span>
            {showReadingTime && (
              <span>• {post.readingTime} min read</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// Default Blog Section with placeholder content
export function DefaultBlogSection() {
  const defaultPosts: BlogPost[] = [
    {
      slug: "getting-started-guide",
      title: "__VG_BLOG_POST_1_TITLE__",
      excerpt: "__VG_BLOG_POST_1_EXCERPT__",
      author: {
        name: "__VG_BLOG_POST_1_AUTHOR__",
        avatar: "__VG_BLOG_POST_1_AUTHOR_AVATAR__",
      },
      publishedAt: "2024-01-15",
      readingTime: 5,
      category: "Getting Started",
      featured: true,
      image: {
        src: "__VG_BLOG_POST_1_IMAGE__",
        alt: "__VG_BLOG_POST_1_IMAGE_ALT__",
      },
    },
    {
      slug: "best-practices",
      title: "__VG_BLOG_POST_2_TITLE__",
      excerpt: "__VG_BLOG_POST_2_EXCERPT__",
      author: {
        name: "__VG_BLOG_POST_2_AUTHOR__",
        avatar: "__VG_BLOG_POST_2_AUTHOR_AVATAR__",
      },
      publishedAt: "2024-01-10",
      readingTime: 8,
      category: "Best Practices",
      image: {
        src: "__VG_BLOG_POST_2_IMAGE__",
        alt: "__VG_BLOG_POST_2_IMAGE_ALT__",
      },
    },
    {
      slug: "feature-announcement",
      title: "__VG_BLOG_POST_3_TITLE__",
      excerpt: "__VG_BLOG_POST_3_EXCERPT__",
      author: {
        name: "__VG_BLOG_POST_3_AUTHOR__",
        avatar: "__VG_BLOG_POST_3_AUTHOR_AVATAR__",
      },
      publishedAt: "2024-01-05",
      readingTime: 3,
      category: "Product Updates",
      image: {
        src: "__VG_BLOG_POST_3_IMAGE__",
        alt: "__VG_BLOG_POST_3_IMAGE_ALT__",
      },
    },
  ];

  return (
    <BlogSection
      title="__VG_BLOG_SECTION_TITLE__"
      subtitle="__VG_BLOG_SECTION_SUBTITLE__"
      posts={defaultPosts}
      layout="grid"
      showExcerpts={true}
      showCategories={true}
      showAuthors={true}
      showReadingTime={true}
      maxPosts={3}
    />
  );
}