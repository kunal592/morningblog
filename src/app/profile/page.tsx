'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Post, User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { BlogCard } from '@/components/blog/blog-card';
import { Bookmark, UserPlus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<Post[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (session) {
      // @ts-ignore
      axios.get(`/api/users/${session.user.username}`).then((res) => {
        setUser(res.data.user);
        // TODO: Get bookmarked blogs
      });
    }
  }, [session]);

  const handleUnbookmark = (title: string) => {
    toast({
      title: 'Bookmark Removed',
      description: `"${title}" has been removed from your bookmarks.`,
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-2xl overflow-hidden shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-primary">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback className="text-4xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="mt-2 text-muted-foreground">Bio not available</p> {/* TODO: Add bio to user model */}
              <div className="mt-4 flex justify-center md:justify-start gap-6">
                <div className="text-center">
                  <p className="font-bold text-lg">{user.followers?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{user.following?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Enter your bio" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="bookmarked">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="bookmarked">
            <Bookmark className="mr-2 h-4 w-4" /> Bookmarked
          </TabsTrigger>
          <TabsTrigger value="following">
            <UserPlus className="mr-2 h-4 w-4" /> Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bookmarked" className="mt-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarkedBlogs.map((blog) => (
              <div key={blog.id} className="relative group">
                <BlogCard blog={blog} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleUnbookmark(blog.title)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="following" className="mt-6">
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
            <UserPlus className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">You aren't following anyone yet</h3>
            <p className="mt-2 text-muted-foreground">
              Follow authors to see their latest posts here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
