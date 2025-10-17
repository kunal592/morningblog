"use client"

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBlogs, mockUsers } from "@/lib/mock-data";
import { DataTable } from "@/components/dashboard/data-table";
import { columns } from "@/components/dashboard/columns";

export default function DashboardPage() {
  const currentUser = mockUsers[0];
  const userBlogs = mockBlogs.filter(blog => blog.author.id === currentUser.id);

  const publishedBlogs = userBlogs.filter(b => b.isPublished);
  const unpublishedBlogs = userBlogs.filter(b => !b.isPublished);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/postblog" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="published">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="unpublished">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="published" className="mt-4">
          <DataTable columns={columns} data={publishedBlogs} />
        </TabsContent>
        <TabsContent value="unpublished" className="mt-4">
          <DataTable columns={columns} data={unpublishedBlogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
