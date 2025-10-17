"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Blog } from "@/lib/mock-data";
import { MoreHorizontal, Trash2 } from "lucide-react";

export const blogColumns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }: { row: { original: Blog } }) => (
      <div className="font-medium">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }: { row: { original: Blog } }) => (
      <div>{row.original.author.name}</div>
    ),
  },
  {
    accessorKey: "publishedAt",
    header: "Date",
    cell: ({ row }: { row: { original: Blog } }) => {
      return new Date(row.original.publishedAt).toLocaleDateString();
    },
  },
    {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }: { row: { original: Blog } }) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.original.isPublished
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        }`}
      >
        {row.original.isPublished ? "Published" : "Draft"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: Blog } }) => {
      return (
        <div className="text-right">
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Post
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      );
    },
  },
];
