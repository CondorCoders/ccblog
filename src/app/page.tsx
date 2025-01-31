import { Tag } from "@/components/Tag";
import { getCategories, getPosts } from "./actions";
import { Post } from "@/components/Post";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts({ pageSize: 2 });
  const categories = await getCategories();
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl md:text-6xl">
        Bienvenido al blog de <br /> Condor Coders
      </h1>
      <h2 className="m-0 text-purple-400 dark:text-purple-200 text-lg">
        Últimos artículos
      </h2>
      <div className="flex flex-col gap-2">
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      <div className="py-8 w-full text-center">
        <Link
          href="/blog"
          className="no-underline py-2 px-4 text-black font-bold bg-purple-400 dark:bg-purple-200 rounded-md hover:bg-purple-200/90  transition-colors"
        >
          Ver más artículos
        </Link>
      </div>

      <h2 className="m-0 text-purple-400 dark:text-purple-200 text-lg mt-4">
        Categorias
      </h2>
      <div className="mt-4 flex gap-2">
        {categories?.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
