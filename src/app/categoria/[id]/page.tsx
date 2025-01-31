import { getPosts } from "@/app/actions";
import { Post } from "@/components/Post";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const categoryId = decodeURIComponent((await params).id);
  const posts = await getPosts({ categoryId });

  console.log(posts);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl md:text-5xl">{categoryId}</h1>

      {posts?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      {!posts && <h2>No encontramos artículas en esta categoria.</h2>}
    </div>
  );
}
