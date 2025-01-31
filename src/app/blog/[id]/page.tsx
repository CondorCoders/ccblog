import { getPostById } from "@/app/actions";
import { Tag } from "@/components/Tag";
import Image from "next/image";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;
  const post = await getPostById(postId);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {post?.thumbnail && (
        <div className="relative h-72 mb-8">
          <Image
            className="object-cover m-0"
            alt={`Imagen de portada del post ${post.titulo}`}
            src={post?.thumbnail}
            fill
          />
        </div>
      )}
      <h1 className="text-4xl md:text-5xl">{post?.titulo}</h1>
      <p className="text-purple-400 dark:text-purple-200">
        {post?.descripcion}
      </p>
      {post?.publicado && (
        <time>
          {new Date(post?.publicado).toLocaleDateString("ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      )}
      {post?.content && (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
      {post?.etiquetas && (
        <>
          <h3>Categorias</h3>
          <div className="flex gap-2">
            {post?.etiquetas?.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
