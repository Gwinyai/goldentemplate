import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdmin } from "@/lib/auth/require-admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function AdminBlogPage() {
  const user = await requireAdmin();

  // Mock blog posts data
  const blogPosts = [
    {
      id: "1",
      title: "Getting Started with Next.js 14",
      slug: "getting-started-nextjs-14",
      author: "John Doe",
      status: "published",
      publishedAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      views: 1247,
      excerpt: "Learn how to build modern web applications with Next.js 14 and the new App Router."
    },
    {
      id: "2", 
      title: "Building Scalable APIs with TypeScript",
      slug: "scalable-apis-typescript",
      author: "Jane Smith",
      status: "draft",
      publishedAt: null,
      updatedAt: "2024-01-14T14:20:00Z",
      views: 0,
      excerpt: "Best practices for creating maintainable and scalable REST APIs using TypeScript."
    },
    {
      id: "3",
      title: "Database Design Patterns",
      slug: "database-design-patterns", 
      author: "Mike Johnson",
      status: "published",
      publishedAt: "2024-01-12T09:15:00Z",
      updatedAt: "2024-01-12T09:15:00Z",
      views: 892,
      excerpt: "Common database design patterns and when to use them in your applications."
    },
    {
      id: "4",
      title: "React Performance Optimization",
      slug: "react-performance-optimization",
      author: "Sarah Wilson",
      status: "scheduled",
      publishedAt: "2024-01-20T08:00:00Z",
      updatedAt: "2024-01-10T16:45:00Z", 
      views: 0,
      excerpt: "Techniques and strategies to optimize React application performance."
    }
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminShell user={user}>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <PageHeader
            title="Blog Management"
            description="Manage blog posts, drafts, and content"
          />
          <Button>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Button>
        </div>

        {/* Blog Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+5 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">91% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Drafts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">8% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5K</div>
              <p className="text-xs text-muted-foreground">+12% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input placeholder="Search posts..." className="max-w-sm" />
              <select className="px-3 py-2 border border-input rounded-md bg-background text-sm">
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <select className="px-3 py-2 border border-input rounded-md bg-background text-sm">
                <option value="all">All Authors</option>
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="mike">Mike Johnson</option>
              </select>
            </div>

            {/* Posts Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Title</th>
                    <th className="text-left py-3 px-4 font-medium">Author</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Published</th>
                    <th className="text-left py-3 px-4 font-medium">Views</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="font-medium hover:text-primary"
                          >
                            {post.title}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">{post.author}</td>
                      <td className="py-4 px-4">{getStatusBadge(post.status)}</td>
                      <td className="py-4 px-4 text-sm">{formatDate(post.publishedAt)}</td>
                      <td className="py-4 px-4 text-sm">{post.views.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-muted-foreground">
                Showing 1-4 of 156 posts
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bulk Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Publish Selected
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Move to Draft
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-red-600">
                Delete Selected
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Manage Categories
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Manage Tags
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                SEO Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                View Analytics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Content Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}