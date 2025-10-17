# 🎨 Narrato: Premium Blog & Publishing Platform Blueprint

Narrato is a sophisticated, premium Software as a Service (SaaS) blogging platform designed for a clean, distraction-free user experience, drawing inspiration from the layout and focus of Medium.com. The primary goal is to provide authors with powerful creation tools (Markdown/AI) and readers with curated, high-quality content.

## 1. 🚀 Core Features & User Journeys

| Route/Section | Accessibility | Description & Features | Technical Goal (Prisma Models) |
| :--- | :--- | :--- | :--- |
| **Home Feed** (`/home`) | Public | Displays **all published blogs** (`Post.status: PUBLISHED`). Includes a **Grid/List Toggle** for view switching. | Efficient read-all `Post` query with pagination. |
| **Personalized Feed** (`/feed`) | Protected | Displays blogs from only the **followed authors**. Shows a clear call-to-action message if the user follows no authors. | Query `Post` where `Post.authorId` is in `Follow.followingId`. |
| **Post Editor** (`/postblog`) | Protected | **Two-Pane Markdown Editor** with live side-by-side preview. Features a dedicated **AI SEO Optimization** button to refine content metadata. | Server-side markdown rendering, API call to `/api/ai`. |
| **Notifications** (`/notification`) | Protected | Lists new **Comments** on the user's posts and new **Followers**. Allows authors to **Delete Reported Comments** on their blogs. | Filter `Notification` by `recipientId` for types `COMMENT` and `FOLLOW`. |
| **User Profile** (`/profile/[username]`) | Public/Protected | Displays **Avatar, Bio, Follower/Following Counts**. For the logged-in user, it lists their **Bookmarked Blogs** with an **Unbookmark** option. | Aggregate counts from `Follow` and filter `Bookmark` by `userId`. |
| **Author Dashboard** (`/dashboard`) | Protected | Full **CRUD operations** for the user's blogs: managing `DRAFT`, `PUBLISHED`, and `ARCHIVED` posts. | Secure server actions (`blog.actions.ts`) enforcing `authorId` match. |
| **Admin Panel** (`/admin`) | Admin-Only | **Comprehensive control** over the platform. Includes: **User Management** (list all, view posts, suspend/modify role), **Content Moderation** (manage reported content, status changes), and **Site Statistics**. | Protected route and exclusive server actions (`admin.actions.ts`). |
| **Settings** (`/settings`) | Protected | User management for **Profile Update** (username, bio, social links), **Security** (password change), **Notification Preferences**, and **Subscription/Payment** status. | Utilizes `user.actions.ts` and `payment.actions.ts`. |
| **Static Pages** (`/about`, `/contactus`) | Public | Static marketing/information pages and a query submission form. | Simple UI rendering and form submission logic. |

---

## 2. 🎨 Style & UX Guidelines

### Design Identity
* **Primary Color:** **Deep Violet** ($\#673AB7$) - Sophisticated and contemporary.
* **Accent Color:** **Deep Purple** ($\#311B92$) - For buttons and interactive highlights.
* **Light Mode Background:** **Light Gray** ($\#F5F5FA$) - Clean canvas.
* **Dark Mode Background:** **Dark Indigo** ($\#12121D$) - A rich, premium dark theme (avoids pure black/white).
* **Typography:** **'Inter'** (sans-serif) for all body and headline text.
* **Visuals:** **Rounded corners (2xl)**, subtle shadows, line-based icons, and generous padding for an airy feel.

### Premium UX Expectations
1.  **Layout:** **Sidebar Navigation** is the primary method of access. **No Footer**. Layout mimics the focused reading experience of Medium.com.
2.  **Sidebar Toggle:** The sidebar must be **collapsible** (hidden/visible) via a toggle icon using **Framer Motion** for smooth, animated transitions.
3.  **Theme Toggle:** A dedicated **Light/Dark Mode Toggle** is required, ensuring the Dark Indigo theme is implemented for a premium look.
4.  **Feedback:** All successful operations (like, follow, bookmark, update) must use **Toasts** for immediate, non-intrusive user feedback (e.g., "You followed the author," "Blog bookmarked!").

### Blog Post Interactions (Universal)
Every blog post will include the following interactive elements implemented via server actions:
* **Like/Unlike** (`like.actions.ts`)
* **Bookmark/Unbookmark** (`follow.actions.ts`)
* **Share** (records a `Share` event)
* **Follow Author** (`follow.actions.ts`)
* **AI Summarizer Tool** (generates a summary on demand)
* **Comment Section** (nested replies supported by `Comment.parentId`).

---

## 3. 🛠️ Technical Structure & Dependencies

The project is built with **Next.js App Router** and organized for scalability and maintainability.

### Folder Structure (Required)

| Folder | Purpose |
| :--- | :--- |
| **`src/app/(public)/`** | Unauthenticated, publicly accessible routes. |
| **`src/app/(protected)/`** | Authenticated routes (user must be logged in). |
| **`src/app/(admin)/`** | Authenticated, Admin-Role-only routes. |
| **`src/app/api/`** | REST API endpoints (e.g., AI integration, external webhooks). |
| **`src/components/`** | All reusable UI components (divided by domain: `blog`, `editor`, `layout`, `user`, `ui`). |
| **`src/actions/`** | **Next.js Server Actions** for all data mutations and business logic. |
| **`src/lib/`** | Core libraries: `prisma.ts`, `auth.ts`, `validation.ts`, `utils.ts`, and theme configuration. |
| **`src/hooks/`** | Reusable client-side logic (e.g., `useFollow.ts`, `useLike.ts`, `useAI.ts`). |
| **`src/types/`** | Shared TypeScript interfaces and types. |
| **`middleware.ts`** | NextAuth route protection logic for `(protected)` and `(admin)` routes. |

### Data Layer (Prisma)
The provided `schema.prisma` is the **single source of truth** for the database structure. All application features must map directly to the defined models and enums (`User`, `Post`, `Comment`, `Notification`, `Role`, etc.).

### Key Libraries
* **NextAuth:** For user authentication and session management.
* **Prisma:** ORM for database interaction.
* **Tailwind CSS:** For styling (utility-first approach).
* **Framer Motion:** For required smooth, sophisticated animations.
* **Razorpay (Simulated):** For payment/subscription logic (handled via `payment.actions.ts` and `/api/payment`).

This blueprint represents the complete functional and design specifications for Narrato.