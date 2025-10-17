"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDataTable } from "@/components/admin/user-data-table";
import { userColumns } from "@/components/admin/user-columns";
import { BlogDataTable } from "@/components/admin/blog-data-table";
import { blogColumns } from "@/components/admin/blog-columns";
import { useEffect, useState } from "react";
import { Post, User } from "@/lib/types";
import axios from "axios";

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [blogs, setBlogs] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

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
          <UserDataTable columns={userColumns} data={users} />
        </TabsContent>
        <TabsContent value="blogs" className="mt-4">
          <BlogDataTable columns={blogColumns} data={blogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
