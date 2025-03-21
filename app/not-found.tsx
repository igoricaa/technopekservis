import type { Metadata } from 'next';
import { print } from 'graphql/language/printer';

import { setSeoData } from '@/utils/seo-data';

import { fetchGraphQL } from '@/utils/fetch-graphql';
import { ContentNode, Page } from '@/gql/graphql';
import { SeoQuery } from '@/queries/general/seo-query';
import { getPageByIdQuery } from '@/queries/page-queries';

const notFoundPageWordPressId = 10;

export async function generateMetadata(): Promise<Metadata> {
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(SeoQuery),
    { slug: notFoundPageWordPressId, idType: 'DATABASE_ID' }
  );

  const metadata = setSeoData({ seo: contentNode.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404-not-found/`,
    },
  } as Metadata;
}

export default async function NotFound() {
  const { page } = await fetchGraphQL<{ page: Page }>(print(getPageByIdQuery), {
    id: notFoundPageWordPressId,
  });

  return <div dangerouslySetInnerHTML={{ __html: page.content || ' ' }} />;
}
