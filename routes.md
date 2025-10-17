GET    /api/blogs                 → Fetch all blogs
POST   /api/blogs                 → Create new blog
GET    /api/blogs/feed              → Fetch blog feed for the current user
GET    /api/blogs/published         → Fetch all published blogs
GET    /api/blogs/unpublished       → Fetch all unpublished blogs for the current user
GET    /api/blogs/search            → Search for blogs
GET    /api/blogs/user/{id}         → Fetch all blogs for a user
GET    /api/blogs/{slug}            → Fetch blog by slug
PUT    /api/blogs/{slug}            → Update blog by slug
DELETE /api/blogs/{slug}            → Delete blog by slug
GET    /api/blogs/{slug}/comments   → Fetch all comments for a blog
POST   /api/blogs/{slug}/comments   → Create new comment for a blog
GET    /api/users                 → List all users
POST   /api/users/follow            → Follow a user
POST   /api/users/unfollow          → Unfollow a user
POST   /api/contact               → Send a contact message
