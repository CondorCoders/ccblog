import { PostType } from "@/app/actions";
import Link from "next/link";

export const Post = ({ id, titulo, descripcion, publicado }: PostType) => {
  return (
    <div className="relative group cursor-pointer border-b-[1px] border-purple-200 dark:border-purple-200/20 last:border-0 pb-4">
      <Link
        href={`/blog/${id}`}
        className="before:absolute before:inset-0 no-underline group-hover:text-purple-400 dark:group-hover:text-purple-200"
      >
        <h2 className="group-hover:text-purple-400 dark:group-hover:text-purple-200">
          {titulo}
        </h2>
      </Link>
      <p>{descripcion}</p>
      <time>{publicado}</time>
    </div>
  );
};
