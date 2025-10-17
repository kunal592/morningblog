'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/dashboard/data-table';
import { columns } from '@/components/dashboard/columns';
import { Post } from '@/lib/types';
import axios from 'axios';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [publishedBlogs, setPublishedBlogs] = useState<Post[]>([]);
  const [unpublishedBlogs, setUnpublishedBlogs] = useState<Post[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      axios.get('/api/blogs/published').then((res) => {
        setPublishedBlogs(res.data);
      });
      axios.get('/api/blogs/unpublished').then((res) => {
        setUnpublishedBlogs(res.data);
      });
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <Link href='/postblog' passHref>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            New Post
          </Button>
        </Link>
      </div>
      <Tabs defaultValue='published'>
        <TabsList>
          <TabsTrigger value='published'>Published</TabsTrigger>
          <TabsTrigger value='unpublished'>Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value='published' className='mt-4'>
          <DataTable columns={columns} data={publishedBlogs} />
        </TabsContent>
        <TabsContent value='unpublished' className='mt-4'>
          <DataTable columns={columns} data={unpublishedBlogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
