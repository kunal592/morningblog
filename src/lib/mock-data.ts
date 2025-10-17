import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const imageMap = new Map<string, ImagePlaceholder>(PlaceHolderImages.map(img => [img.id, img]));

export interface User {
  id: string;
  name: string;
  bio: string;
  avatarId: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: User;
  imageId: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
  comments: Comment[];
}

export interface Notification {
  id: string;
  type: 'follow' | 'comment' | 'report';
  user?: User;
  commentContent?: string;
  timestamp: string;
}

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Alex Doe', bio: 'Frontend Developer & UI/UX enthusiast. Exploring the world of React and Next.js.', avatarId: 'user-1', followers: 1250, following: 250 },
  { id: 'user-2', name: 'Maria Garcia', bio: 'Full-stack engineer with a passion for building scalable web applications. Coffee lover.', avatarId: 'user-2', followers: 4800, following: 120 },
  { id: 'user-3', name: 'Chen Wei', bio: 'AI researcher and writer. Breaking down complex topics into simple, understandable articles.', avatarId: 'user-3', followers: 15000, following: 50 },
  { id: 'user-4', name: 'Sam Taylor', bio: 'Designer, photographer, and storyteller. Capturing moments and sharing them with the world.', avatarId: 'user-4', followers: 850, following: 850 },
];

export const mockComments: Comment[] = [
    { id: 'comment-1', author: mockUsers[1], content: 'This is an incredibly insightful article. Thanks for sharing!', timestamp: '2 hours ago' },
    { id: 'comment-2', author: mockUsers[3], content: 'Great read! I learned a lot about this topic.', timestamp: '5 hours ago' },
];

export const mockBlogs: Blog[] = [
  {
    id: 'blog-1',
    slug: 'the-art-of-minimalism-in-web-design',
    title: 'The Art of Minimalism in Web Design',
    content: "Minimalism is not about removing everything, but about making everything that is left count. In web design, this principle translates to clean layouts, generous whitespace, and a focus on content. A minimalist approach can improve user experience by reducing cognitive load and guiding the user's attention to the most important elements on the page. We will explore how to apply these principles effectively in your next project.",
    author: mockUsers[0],
    imageId: 'blog-2',
    tags: ['web design', 'ui/ux', 'minimalism'],
    publishedAt: '2024-05-10T09:00:00Z',
    isPublished: true,
    comments: mockComments,
  },
  {
    id: 'blog-2',
    slug: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14',
    content: "Next.js 14 introduced a paradigm shift with the App Router and React Server Components. This guide will walk you through setting up a new project, understanding the new directory structure, and building your first server and client components. We'll cover routing, data fetching, and styling to get you up and running in no time. The future of React development is here, and it's faster and more powerful than ever.",
    author: mockUsers[1],
    imageId: 'blog-5',
    tags: ['next.js', 'react', 'webdev'],
    publishedAt: '2024-05-09T14:30:00Z',
    isPublished: true,
    comments: [],
  },
  {
    id: 'blog-3',
    slug: 'a-deep-dive-into-css-grid',
    title: 'A Deep Dive into CSS Grid',
    content: "CSS Grid is a powerful layout system that allows for two-dimensional layouts on the web. Forget floats and positioning hacks. This article provides a comprehensive overview of CSS Grid, from basic concepts like `grid-template-columns` and `grid-template-rows` to advanced techniques like `grid-auto-flow` and named grid areas. With practical examples and code snippets, you'll be creating complex, responsive layouts with ease.",
    author: mockUsers[0],
    imageId: 'blog-1',
    tags: ['css', 'frontend', 'tutorial'],
    publishedAt: '2024-05-08T11:00:00Z',
    isPublished: true,
    comments: [],
  },
  {
    id: 'blog-4',
    slug: 'the-rise-of-ai-in-content-creation',
    title: 'The Rise of AI in Content Creation',
    content: "Artificial Intelligence is no longer a futuristic concept; it's a tool that's transforming industries, including content creation. From generating blog post ideas to writing entire articles, AI is changing how we produce and consume information. This post explores the current state of AI in content creation, its benefits, its limitations, and what it means for the future of writers and creators.",
    author: mockUsers[2],
    imageId: 'blog-3',
    tags: ['ai', 'technology', 'writing'],
    publishedAt: '2024-05-07T18:00:00Z',
    isPublished: false,
    comments: [],
  },
  {
    id: 'blog-5',
    slug: 'mastering-composition-in-photography',
    title: 'Mastering Composition in Photography',
    content: "Great photography is about more than just a good camera; it's about composition. The rule of thirds, leading lines, framing, and symmetry are fundamental principles that can elevate your photos from simple snapshots to compelling works of art. This guide will break down these concepts with visual examples and provide tips on how to apply them in various scenarios, from landscapes to portraits.",
    author: mockUsers[3],
    imageId: 'blog-8',
    tags: ['photography', 'art', 'composition'],
    publishedAt: '2024-05-11T10:00:00Z',
    isPublished: true,
    comments: [],
  },
  {
    id: 'blog-6',
    slug: 'a-guide-to-sustainable-living',
    title: 'A Guide to Sustainable Living',
    content: "Sustainable living is about making conscious choices to reduce your environmental impact. It can seem daunting, but even small changes can make a big difference. This article offers practical tips on how to live more sustainably, covering everything from reducing waste and conserving energy to making eco-friendly choices in food and transportation. Join the movement towards a healthier planet.",
    author: mockUsers[1],
    imageId: 'blog-4',
    tags: ['sustainability', 'lifestyle', 'environment'],
    publishedAt: '2024-05-12T12:00:00Z',
    isPublished: true,
    comments: [],
  },
];

export const mockNotifications: Notification[] = [
  { id: 'notif-1', type: 'follow', user: mockUsers[3], timestamp: '1 day ago' },
  { id: 'notif-2', type: 'comment', user: mockUsers[1], commentContent: 'This is an incredibly insightful article. Thanks for sharing!', timestamp: '2 days ago' },
  { id: 'notif-3', type: 'report', commentContent: 'Inappropriate content in blog post "A Deep Dive into CSS Grid"', timestamp: '3 days ago' },
  { id: 'notif-4', type: 'follow', user: mockUsers[2], timestamp: '4 days ago' },
];

export const teamMembers = [
    { name: 'Jordan Lee', role: 'Founder & CEO', imageId: 'user-5' },
    { name: 'Casey Smith', role: 'Head of Engineering', imageId: 'user-6' },
    { name: 'Riley Jones', role: 'Lead Designer', imageId: 'user-7' },
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return mockBlogs.find(blog => blog.slug === slug);
}

export function getImageById(id: string): ImagePlaceholder | undefined {
    return imageMap.get(id);
}
