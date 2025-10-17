# Backend Integration Guide

This document outlines the API endpoints required for the frontend application and provides guidance on how to integrate them.

## API Endpoints

The following API endpoints need to be created in the backend:

### Blog Posts

*   **`GET /api/blogs`**: Get a list of all blog posts.
*   **`GET /api/blogs/published`**: Get a list of published blog posts.
*   **`GET /api/blogs/unpublished`**: Get a list of unpublished blog posts (drafts).
*   **`GET /api/blogs/user/:userId`**: Get all blog posts for a specific user.
*   **`GET /api/blogs/feed`**: Get the current user's feed (blogs from followed authors).
*   **`GET /api/blogs/:slug`**: Get a single blog post by its slug.
*   **`POST /api/blogs`**: Create a new blog post.
    *   **Request Body**:
        ```json
        {
          "title": "string",
          "content": "string",
          "isPublished": "boolean"
        }
        ```
*   **`PUT /api/blogs/:id`**: Update a blog post (for publishing or saving drafts).
    *   **Request Body**:
        ```json
        {
          "title": "string",
          "content": "string",
          "isPublished": "boolean"
        }
        ```
*   **`DELETE /api/blogs/:id`**: Delete a blog post.

### Users

*   **`GET /api/users`**: Get a list of all users (for admin).
*   **`GET /api/users/:id`**: Get a single user by their ID.
*   **`POST /api/users/follow/:userId`**: Follow an author.
*   **`POST /api/users/unfollow/:userId`**: Unfollow an author.

### Comments

*   **`POST /api/comments`**: Add a comment to a blog post.
    *   **Request Body**:
        ```json
        {
          "blogId": "string",
          "content": "string"
        }
        ```

## Frontend Integration

To connect the frontend to the backend, you will need to replace the mock data with API calls to the endpoints listed above. Here's a list of the files that need to be updated:

*   `src/app/dashboard/page.tsx`: Fetch user's published and unpublished blogs.
*   `src/app/(protected)/feed/page.tsx`: Fetch the user's feed.
*   `src/app/(protected)/postblog/page.tsx`: Implement `handlePublish` and `handleSaveDraft` to create and update blog posts.
*   `src/app/blog/[slug]/page.tsx`: Fetch blog post data by slug.
*   `src/components/blog/comment-section.tsx`: Implement the "Post Comment" functionality.
*   `src/app/(protected)/admin/page.tsx`: Fetch user and blog data for the admin dashboard.

Here's an example of how to fetch data in a Next.js component using `fetch`:

```typescript
async function getData() {
  const res = await fetch('http://localhost:3000/api/blogs');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
}
```
