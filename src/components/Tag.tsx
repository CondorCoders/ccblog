import Link from "next/link";

export const Tag = ({ tag }: { tag: string }) => {
  return (
    <Link
      href={`/categoria/${tag}`}
      className="no-underline border-[1px] border-purple-400/40 dark:border-purple-200/20 px-2 py-1 rounded-md hover:border-purple-400 dark:hover:border-purple-200 hover:text-purple-400 dark:hover:text-purple-200 transition-colors"
    >
      {tag}
    </Link>
  );
};
