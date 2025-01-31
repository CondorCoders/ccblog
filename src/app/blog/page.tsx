import { Post } from "@/components/Post";
import { getPosts } from "../actions";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl md:text-5xl">Todos los artículos</h1>
      <div className="flex flex-col gap-2">
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
