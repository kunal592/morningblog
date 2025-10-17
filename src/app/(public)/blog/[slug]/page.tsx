
import { getBlog } from "@/actions/blogActions";
import { getComments } from "@/actions/commentActions";
import { BlogDetail } from "./blog-detail";

interface BlogPageParams {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: BlogPageParams) {
  const { slug } = params;
  const blog = await getBlog(slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const comments = await getComments({ where: { postId: blog.id } });

  return <BlogDetail blog={blog} initialComments={comments} />;
}
