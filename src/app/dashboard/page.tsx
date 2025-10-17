
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/dashboard/data-table';
import { columns } from '@/components/dashboard/columns';
import { getBlogs } from '@/actions/blogActions';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Access Denied</div>;
  }

  const publishedBlogs = await getBlogs({
    where: {
      authorId: session.user.id,
      publishedAt: {
        not: null,
      },
    },
    include: {
        tags: true,
        author: true
    }
  });

  const unpublishedBlogs = await getBlogs({
    where: {
      authorId: session.user.id,
      publishedAt: null,
    },
    include: {
        tags: true,
        author: true
    }
  });

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
