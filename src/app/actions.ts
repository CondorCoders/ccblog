"use server";

import { Properties } from "@/types/notion.types";
import { NotionRenderer } from "@notion-render/client";
import { Client, isFullBlock, isFullPageOrDatabase } from "@notionhq/client";

export interface PostType {
  id: string;
  titulo: string;
  descripcion: string;
  publicado: string;
  thumbnail?: string;
  etiquetas?: string[];
  content?: string;
}

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const renderer = new NotionRenderer();
const databaseId = process.env.BLOG_DB_ID;

interface GetPostsProps {
  categoryId?: string;
  pageSize?: number;
}

export const getPosts = async ({
  categoryId,
  pageSize,
}: GetPostsProps = {}): Promise<PostType[] | null> => {
  if (!databaseId) return null;

  const filters = [
    {
      property: "estado",
      status: {
        equals: "publicado",
      },
    },
  ];

  if (categoryId) {
    filters.push({
      property: "etiquetas",
      multi_select: {
        contains: categoryId,
      },
    });
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: pageSize || 100,
    filter: {
      and: filters,
    },
    sorts: [
      {
        property: "publicado",
        direction: "descending",
      },
    ],
  });

  if (!response || !response?.results.length) return null;

  const posts: PostType[] = response.results
    .filter(isFullPageOrDatabase)
    .filter(
      (result) =>
        (result.properties as unknown as Properties).titulo?.title?.[0]
          ?.plain_text &&
        (result.properties as unknown as Properties).descripcion?.rich_text?.[0]
          ?.plain_text
    )
    .map((result) => {
      const properties = result.properties as unknown as Properties;
      return {
        id: result.id,
        titulo: properties.titulo?.title?.[0]?.plain_text,
        descripcion: properties.descripcion?.rich_text?.[0]?.plain_text,
        publicado: properties.publicado?.date?.start,
        thumbnail: properties.thumbnail.files?.[0]?.file?.url,
        etiquetas: properties.etiquetas?.multi_select?.map(
          (etiqueta) => etiqueta.name
        ),
      };
    });

  return posts;
};

export const getPostById = async (id: string): Promise<PostType | null> => {
  if (!databaseId || !id) return null;

  const response = await notion.pages.retrieve({
    page_id: id,
  });
  const { results } = await notion.blocks.children.list({
    block_id: id,
  });
  const isAllBlocks = results.every(isFullBlock);
  if (!response || !isFullPageOrDatabase(response) || !results || !isAllBlocks)
    return null;

  const html = await renderer.render(...results);

  const properties = response.properties as unknown as Properties;

  return {
    id: response.id,
    titulo: properties.titulo?.title?.[0]?.plain_text,
    descripcion: properties.descripcion?.rich_text?.[0]?.plain_text,
    publicado: properties.publicado?.date?.start,
    thumbnail: properties.thumbnail.files?.[0]?.file?.url,
    etiquetas: properties.etiquetas?.multi_select?.map(
      (etiqueta) => etiqueta.name
    ),
    content: html,
  };
};

export const getCategories = async (): Promise<string[] | null> => {
  if (!databaseId) return null;

  const response = await notion.databases.retrieve({ database_id: databaseId });

  if (!response || !isFullPageOrDatabase(response)) return null;

  return response.properties.etiquetas?.multi_select?.options?.map(
    (etiqueta) => etiqueta.name
  );
};
