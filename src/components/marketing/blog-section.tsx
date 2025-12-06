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
    <section className="py-section-mobile md:py-section relative">
      <div className="container mx-auto px-container-mobile md:px-container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="section-title">
            <span>{title}</span>
          </h2>
          {subtitle && (
            <p className="mt-6 section-description">
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
    <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-border/50 overflow-hidden">
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden relative">
          <img
            src={post.image.src}
            alt={post.image.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <CardHeader>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {showCategories && (
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          )}
          {post.featured && (
            <Badge className="text-xs bg-gradient-primary shadow-primary">Featured</Badge>
          )}
        </div>
        
        <CardTitle className="line-clamp-2 leading-tight">
          <Link href={`/blog/${post.slug}`} className="text-text-primary hover:text-primary transition-colors group-hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
        
        {showExcerpts && (
          <CardDescription className="line-clamp-3 mt-3 leading-7 text-text-secondary">
            {post.excerpt}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
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
          <Link href={`/blog/${post.slug}`} className="text-text-primary hover:text-primary transition-colors">
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
      title: "Building Your First SaaS in Days, Not Months",
      excerpt: "Learn how to launch your production-ready SaaS application using VibeCodeMax's comprehensive boilerplate. Complete setup in under 30 minutes.",
      author: {
        name: "Alex Chen",
      },
      publishedAt: "2024-01-15",
      readingTime: 5,
      category: "Getting Started",
      image: {
        src: "/blog1.png",
        alt: "Building your first SaaS in days, not months",
      },
    },
    {
      slug: "best-practices",
      title: "Design Token Architecture: Building Scalable UI Systems",
      excerpt: "Discover how VibeCodeMax's design token system enables consistent branding and rapid customization across your entire application.",
      author: {
        name: "Sarah Rodriguez",
      },
      publishedAt: "2024-01-10",
      readingTime: 8,
      category: "Best Practices",
      image: {
        src: "/blog2.png",
        alt: "Design token architecture for scalable UI systems",
      },
    },
    {
      slug: "feature-announcement",
      title: "New: Advanced Analytics Dashboard & Monitoring",
      excerpt: "We've added comprehensive analytics and monitoring capabilities to help you track your SaaS metrics from day one.",
      author: {
        name: "Marcus Kim",
      },
      publishedAt: "2024-01-05",
      readingTime: 3,
      category: "Product Updates",
      image: {
        src: "/blog3.png",
        alt: "Advanced analytics dashboard and monitoring",
      },
    },
  ];

  return (
    <BlogSection
      title="Latest from Our Blog"
      subtitle="Stay updated with the latest tips, tutorials, and product updates to maximize your development velocity."
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
