import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/marketing";
import { PageContainer } from "@/components/layout";
import { Button, Badge } from "@/components/ui";

// Mock blog posts data - in a real app, this would come from a CMS or database
const mockBlogPosts = {
  "getting-started-guide": {
    title: "Getting Started with Our Platform: A Comprehensive Guide",
    excerpt: "Learn how to get up and running with our platform in just a few minutes. This guide covers everything from initial setup to deploying your first project.",
    content: `
      <h2>Welcome to the Ultimate Getting Started Guide</h2>
      
      <p>Getting started with our platform is easier than you might think. In this comprehensive guide, we'll walk you through everything you need to know to go from zero to your first deployed project in just minutes.</p>
      
      <h3>What You'll Learn</h3>
      <ul>
        <li>How to set up your account and workspace</li>
        <li>Creating your first project</li>
        <li>Understanding the core features</li>
        <li>Best practices for success</li>
        <li>Deploying your project to production</li>
      </ul>
      
      <h3>Step 1: Account Setup</h3>
      <p>The first step is creating your account. Head over to our signup page and create your account using either email or one of our social login options. Once you've verified your email, you'll be ready to start building.</p>
      
      <blockquote>
        <p>💡 <strong>Pro Tip:</strong> Use your work email when signing up if you plan to collaborate with teammates later.</p>
      </blockquote>
      
      <h3>Step 2: Creating Your First Project</h3>
      <p>Once you're logged in, you'll see the project dashboard. Click the "New Project" button to get started. You'll be prompted to choose from several templates:</p>
      
      <ul>
        <li><strong>Blank Project</strong> - Start from scratch</li>
        <li><strong>Quick Start</strong> - Pre-configured with common settings</li>
        <li><strong>Team Template</strong> - Optimized for collaboration</li>
      </ul>
      
      <p>For this guide, we recommend starting with the Quick Start template as it includes sensible defaults and example content.</p>
      
      <h3>Step 3: Understanding the Interface</h3>
      <p>Our interface is designed to be intuitive and productive. Here are the key areas you should know about:</p>
      
      <h4>The Dashboard</h4>
      <p>Your central hub for managing all your projects. Here you can see project status, recent activity, and quick actions.</p>
      
      <h4>The Editor</h4>
      <p>Where the magic happens. Our editor includes syntax highlighting, auto-completion, and real-time collaboration features.</p>
      
      <h4>The Sidebar</h4>
      <p>Access to project settings, team management, and deployment options.</p>
      
      <h3>Step 4: Best Practices</h3>
      <p>To get the most out of our platform, here are some best practices we recommend:</p>
      
      <ol>
        <li><strong>Use descriptive project names</strong> - This helps with organization as your project count grows</li>
        <li><strong>Set up team permissions early</strong> - Define who can view, edit, and deploy</li>
        <li><strong>Take advantage of templates</strong> - Don't reinvent the wheel</li>
        <li><strong>Regular backups</strong> - Enable automatic backups in your project settings</li>
      </ol>
      
      <h3>Step 5: Deploying to Production</h3>
      <p>When you're ready to go live, deployment is just one click away. Our platform handles all the complexity of modern web deployment:</p>
      
      <ul>
        <li>Automatic SSL certificates</li>
        <li>Global CDN distribution</li>
        <li>Automatic scaling</li>
        <li>Health monitoring</li>
      </ul>
      
      <p>Simply click the "Deploy" button in your project dashboard and your site will be live in seconds.</p>
      
      <h3>What's Next?</h3>
      <p>Now that you've got the basics down, you might want to explore some of our advanced features:</p>
      
      <ul>
        <li><a href="/blog/best-practices-2024">Best Practices for 2024</a></li>
        <li><a href="/blog/performance-optimization-tips">Performance Optimization</a></li>
        <li><a href="/blog/team-collaboration-tools">Team Collaboration Features</a></li>
      </ul>
      
      <p>We're excited to see what you'll build! If you have any questions, don't hesitate to reach out to our support team.</p>
    `,
    author: {
      name: "Sarah Johnson",
      title: "Developer Relations Engineer",
      avatar: "__VG_BLOG_AUTHOR_1_AVATAR__",
      bio: "Sarah is passionate about helping developers succeed. She's been building web applications for over 8 years and loves sharing her knowledge through writing and speaking.",
    },
    publishedAt: "2024-01-15T10:00:00Z",
    readingTime: 8,
    category: "Getting Started",
    tags: ["tutorial", "setup", "beginner", "guide"],
    image: {
      src: "__VG_BLOG_POST_1_IMAGE__",
      alt: "Getting started guide hero image",
    },
  },
  "best-practices-2024": {
    title: "10 Best Practices for Modern Web Development in 2024",
    excerpt: "Stay ahead of the curve with these essential best practices for web development. From performance optimization to accessibility, we cover it all.",
    content: `
      <h2>Modern Web Development in 2024</h2>
      
      <p>The web development landscape continues to evolve rapidly. What worked last year might not be the best approach today. Here are 10 essential best practices that will keep your projects modern, performant, and maintainable in 2024.</p>
      
      <h3>1. Embrace Component-Based Architecture</h3>
      <p>Component-based architecture isn't new, but it's more important than ever. Breaking your UI into reusable components improves maintainability and consistency across your application.</p>
      
      <h3>2. Prioritize Core Web Vitals</h3>
      <p>Google's Core Web Vitals are now a crucial ranking factor. Focus on:</p>
      <ul>
        <li><strong>Largest Contentful Paint (LCP)</strong> - Should occur within 2.5 seconds</li>
        <li><strong>First Input Delay (FID)</strong> - Should be less than 100 milliseconds</li>
        <li><strong>Cumulative Layout Shift (CLS)</strong> - Should be less than 0.1</li>
      </ul>
      
      <h3>3. Implement Progressive Enhancement</h3>
      <p>Build your applications to work without JavaScript first, then enhance with interactive features. This ensures accessibility and performance for all users.</p>
      
      <h3>4. Use Modern CSS Features</h3>
      <p>Take advantage of modern CSS features like Grid, Flexbox, Custom Properties, and Container Queries. These provide more powerful and flexible layout options.</p>
      
      <h3>5. Optimize for Mobile First</h3>
      <p>With mobile traffic continuing to dominate, always start your designs mobile-first and progressively enhance for larger screens.</p>
      
      <h3>6. Implement Proper Error Handling</h3>
      <p>Robust error handling improves user experience and makes debugging easier. Implement error boundaries, proper logging, and graceful fallbacks.</p>
      
      <h3>7. Focus on Accessibility</h3>
      <p>Accessibility should be built in from the start, not added as an afterthought. Use semantic HTML, proper ARIA labels, and test with screen readers.</p>
      
      <h3>8. Optimize Bundle Sizes</h3>
      <p>Keep your JavaScript bundles small by:</p>
      <ul>
        <li>Code splitting</li>
        <li>Tree shaking</li>
        <li>Lazy loading</li>
        <li>Analyzing bundle composition</li>
      </ul>
      
      <h3>9. Implement Security Best Practices</h3>
      <p>Security should be a top priority. Use HTTPS, implement proper authentication, sanitize inputs, and keep dependencies updated.</p>
      
      <h3>10. Monitor and Measure Performance</h3>
      <p>Use tools like Lighthouse, Web Vitals, and real user monitoring to continuously track and improve your application's performance.</p>
      
      <h3>Conclusion</h3>
      <p>Following these best practices will help you build better, faster, and more accessible web applications. The key is to make these practices part of your regular development workflow, not something you add at the end.</p>
    `,
    author: {
      name: "Alex Chen",
      title: "Senior Frontend Developer",
      avatar: "__VG_BLOG_AUTHOR_2_AVATAR__",
      bio: "Alex is a seasoned frontend developer with expertise in React, TypeScript, and modern web technologies. He's passionate about performance optimization and user experience.",
    },
    publishedAt: "2024-01-12T14:30:00Z",
    readingTime: 12,
    category: "Best Practices",
    tags: ["web development", "best practices", "2024", "performance"],
    image: {
      src: "__VG_BLOG_POST_2_IMAGE__",
      alt: "Modern web development best practices",
    },
  },
  "new-features-announcement": {
    title: "Exciting New Features: What's Coming in Q1 2024",
    excerpt: "We're thrilled to announce several new features that will make your development experience even better. Here's what's coming next quarter.",
    content: `
      <h2>Big Things Are Coming!</h2>
      
      <p>We've been working hard behind the scenes to bring you some incredible new features. Q1 2024 is going to be our biggest release yet, and we can't wait to share what we've been building.</p>
      
      <h3>Enhanced Collaboration Tools</h3>
      <p>Working with your team is about to get a lot smoother. We're introducing:</p>
      <ul>
        <li><strong>Real-time commenting</strong> - Leave comments directly on code and designs</li>
        <li><strong>Live cursors</strong> - See where your teammates are working in real-time</li>
        <li><strong>Change tracking</strong> - Better visibility into who changed what and when</li>
      </ul>
      
      <h3>AI-Powered Code Suggestions</h3>
      <p>Our new AI assistant will help you write better code faster. It can:</p>
      <ul>
        <li>Suggest code completions</li>
        <li>Identify potential bugs</li>
        <li>Recommend performance optimizations</li>
        <li>Generate documentation</li>
      </ul>
      
      <h3>Advanced Analytics Dashboard</h3>
      <p>Get deeper insights into your projects with our new analytics dashboard:</p>
      <ul>
        <li>Performance metrics</li>
        <li>User engagement data</li>
        <li>Error tracking</li>
        <li>Team productivity metrics</li>
      </ul>
      
      <h3>Mobile App</h3>
      <p>Manage your projects on the go with our new mobile app for iOS and Android. Features include:</p>
      <ul>
        <li>Project overview and status</li>
        <li>Push notifications for important updates</li>
        <li>Basic editing capabilities</li>
        <li>Team communication</li>
      </ul>
      
      <h3>When Can You Try These Features?</h3>
      <p>We're rolling out these features gradually throughout Q1:</p>
      <ul>
        <li><strong>January</strong> - Enhanced collaboration tools (Beta)</li>
        <li><strong>February</strong> - AI-powered suggestions (Early Access)</li>
        <li><strong>March</strong> - Analytics dashboard and mobile app</li>
      </ul>
      
      <p>Want to be among the first to try these features? Sign up for our beta program and get early access to everything we're building.</p>
    `,
    author: {
      name: "Mike Rodriguez",
      title: "Product Manager",
      avatar: "__VG_BLOG_AUTHOR_3_AVATAR__",
      bio: "Mike leads our product team and is always thinking about how to make our platform better. He has over 10 years of experience in product management at various tech companies.",
    },
    publishedAt: "2024-01-08T09:00:00Z",
    readingTime: 5,
    category: "Product Updates",
    tags: ["product", "features", "announcement", "roadmap"],
    image: {
      src: "__VG_BLOG_POST_3_IMAGE__",
      alt: "New features announcement",
    },
  },
  // Add more mock posts as needed...
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = mockBlogPosts[params.slug as keyof typeof mockBlogPosts];

  if (!post) {
    notFound();
  }

  // Generate share URLs
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${params.slug}`;
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
  };

  return (
    <PageContainer maxWidth="2xl" padding="lg">
      <div className="max-w-4xl mx-auto">
        {/* Back to Blog */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Blog Post */}
        <BlogPost
          title={post.title}
          excerpt={post.excerpt}
          content={post.content}
          author={post.author}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          category={post.category}
          tags={post.tags}
          image={post.image}
          shareUrls={shareUrls}
        />

        {/* Related Posts */}
        <div className="mt-16 pt-8 border-t">
          <h3 className="text-xl font-heading font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mock related posts */}
            {Object.entries(mockBlogPosts)
              .filter(([slug]) => slug !== params.slug)
              .slice(0, 2)
              .map(([slug, relatedPost]) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="group p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    {relatedPost.image && (
                      <div className="flex-shrink-0 w-20 h-16 overflow-hidden rounded bg-muted">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {relatedPost.readingTime} min read
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 bg-muted/50 rounded-lg text-center">
          <h3 className="text-xl font-heading font-bold mb-2">
            Enjoyed this article?
          </h3>
          <p className="text-muted-foreground mb-4">
            Subscribe to our newsletter for more insights and tutorials.
          </p>
          <Button asChild>
            <Link href="/newsletter">Subscribe Now</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}