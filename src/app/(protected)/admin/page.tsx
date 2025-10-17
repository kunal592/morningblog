"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBlogs, mockUsers } from "@/lib/mock-data";
import { UserDataTable } from "@/components/admin/user-data-table";
import { userColumns } from "@/components/admin/user-columns";
import { BlogDataTable } from "@/components/admin/blog-data-table";
import { blogColumns } from "@/components/admin/blog-columns";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <UserDataTable columns={userColumns} data={mockUsers} />
        </TabsContent>
        <TabsContent value="blogs" className="mt-4">
          <BlogDataTable columns={blogColumns} data={mockBlogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
