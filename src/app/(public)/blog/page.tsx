"use client";

import React from "react";
import Link from "next/link";
import { BlogSection } from "@/components/marketing";
import { PageContainer, PageHeader } from "@/components/layout";
import { Badge, Input } from "@/components/ui";

// Mock blog posts data
const mockBlogPosts = [
  {
    slug: "getting-started-guide",
    title: "Getting Started with Our Platform: A Comprehensive Guide",
    excerpt: "Learn how to get up and running with our platform in just a few minutes. This guide covers everything from initial setup to deploying your first project.",
    author: {
      name: "Sarah Johnson",
      avatar: "__VG_BLOG_AUTHOR_1_AVATAR__",
    },
    publishedAt: "2024-01-15",
    readingTime: 8,
    category: "Getting Started",
    featured: true,
    image: {
      src: "__VG_BLOG_POST_1_IMAGE__",
      alt: "Getting started guide hero image",
    },
    tags: ["tutorial", "setup", "beginner"],
  },
  {
    slug: "best-practices-2024",
    title: "10 Best Practices for Modern Web Development in 2024",
    excerpt: "Stay ahead of the curve with these essential best practices for web development. From performance optimization to accessibility, we cover it all.",
    author: {
      name: "Alex Chen",
      avatar: "__VG_BLOG_AUTHOR_2_AVATAR__",
    },
    publishedAt: "2024-01-12",
    readingTime: 12,
    category: "Best Practices",
    image: {
      src: "__VG_BLOG_POST_2_IMAGE__",
      alt: "Modern web development best practices",
    },
    tags: ["web development", "best practices", "2024"],
  },
  {
    slug: "new-features-announcement",
    title: "Exciting New Features: What's Coming in Q1 2024",
    excerpt: "We're thrilled to announce several new features that will make your development experience even better. Here's what's coming next quarter.",
    author: {
      name: "Mike Rodriguez",
      avatar: "__VG_BLOG_AUTHOR_3_AVATAR__",
    },
    publishedAt: "2024-01-08",
    readingTime: 5,
    category: "Product Updates",
    featured: true,
    image: {
      src: "__VG_BLOG_POST_3_IMAGE__",
      alt: "New features announcement",
    },
    tags: ["product", "features", "announcement"],
  },
  {
    slug: "performance-optimization-tips",
    title: "5 Performance Optimization Tips That Actually Work",
    excerpt: "Boost your application performance with these proven optimization techniques. Learn how to identify bottlenecks and implement effective solutions.",
    author: {
      name: "Emily Davis",
      avatar: "__VG_BLOG_AUTHOR_4_AVATAR__",
    },
    publishedAt: "2024-01-05",
    readingTime: 10,
    category: "Performance",
    image: {
      src: "__VG_BLOG_POST_4_IMAGE__",
      alt: "Performance optimization techniques",
    },
    tags: ["performance", "optimization", "speed"],
  },
  {
    slug: "team-collaboration-tools",
    title: "How We Built Better Team Collaboration Into Our Platform",
    excerpt: "Discover the story behind our collaboration features and how they can help your team work more effectively together on complex projects.",
    author: {
      name: "David Park",
      avatar: "__VG_BLOG_AUTHOR_5_AVATAR__",
    },
    publishedAt: "2024-01-02",
    readingTime: 7,
    category: "Collaboration",
    image: {
      src: "__VG_BLOG_POST_5_IMAGE__",
      alt: "Team collaboration tools",
    },
    tags: ["collaboration", "teamwork", "productivity"],
  },
  {
    slug: "security-best-practices",
    title: "Essential Security Practices for Modern Applications",
    excerpt: "Security should never be an afterthought. Learn about the essential security practices every developer should implement from day one.",
    author: {
      name: "Rachel Kim",
      avatar: "__VG_BLOG_AUTHOR_6_AVATAR__",
    },
    publishedAt: "2023-12-28",
    readingTime: 15,
    category: "Security",
    image: {
      src: "__VG_BLOG_POST_6_IMAGE__",
      alt: "Application security best practices",
    },
    tags: ["security", "authentication", "encryption"],
  },
];

const categories = [
  "All",
  "Getting Started",
  "Best Practices", 
  "Product Updates",
  "Performance",
  "Collaboration",
  "Security",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Filter posts based on search and category
  const filteredPosts = mockBlogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <PageContainer maxWidth="xl" padding="lg">
      {/* Page Header */}
      <PageHeader
        title="Blog"
        description="Insights, tutorials, and updates from our team. Stay informed about the latest trends in development and learn new skills."
      />

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6">Featured Articles</h2>
          <BlogSection
            title=""
            posts={featuredPosts}
            layout="grid"
            showExcerpts={true}
            showCategories={true}
            showAuthors={true}
            showReadingTime={true}
          />
        </div>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6">
            {featuredPosts.length > 0 ? "More Articles" : "Latest Articles"}
          </h2>
          <BlogSection
            title=""
            posts={regularPosts}
            layout="list"
            showExcerpts={true}
            showCategories={true}
            showAuthors={true}
            showReadingTime={true}
          />
        </div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16 p-8 bg-muted/50 rounded-lg text-center">
        <h3 className="text-xl font-heading font-bold mb-2">
          Stay Updated
        </h3>
        <p className="text-muted-foreground mb-4">
          Get the latest articles and insights delivered to your inbox.
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <Input placeholder="Enter your email" type="email" />
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </PageContainer>
  );
}