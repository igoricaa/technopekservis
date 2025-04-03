import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { print } from 'graphql/language/printer';

import { setSeoData } from '@/utils/seo-data';

import { fetchGraphQL } from '@/utils/fetch-graphql';
import {
  AllContentInfoQuery,
  ContentInfoQuery,
} from '@/queries/general/content-info-query';
import { ContentNode } from '@/gql/graphql';
import PageTemplate from '@/components/templates/page/page-template';
import { nextSlugToWpSlug } from '@/utils/next-slug-to-wp-slug';
import PostTemplate from '@/components/templates/post/post-template';
import { SeoQuery } from '@/queries/general/seo-query';
import ProductPage from '@/components/product/product-page';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = nextSlugToWpSlug((await params).slug);

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(SeoQuery),
    {
      slug: slug,
      idType: 'URI',
    }
  );

  if (!contentNode) {
    return notFound();
  }

  const metadata = setSeoData({ seo: contentNode.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
    },
  } as Metadata;
}

export function generateStaticParams() {
  return [];
}

export default async function Page({ params }: Props) {
  const slug = nextSlugToWpSlug((await params).slug);
  console.log('slug', slug);

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(ContentInfoQuery),
    {
      slug: slug,
      idType: 'URI',
    }
  );

  const { contentNodes } = await fetchGraphQL<{ contentNodes: ContentNode[] }>(
    print(AllContentInfoQuery)
  );

  console.log('contentNodes:', contentNodes);

  if (!contentNode) return notFound();

  console.log('contentNode:', contentNode);

  switch (contentNode.contentTypeName) {
    case 'page':
      return <PageTemplate node={contentNode} />;
    case 'post':
      return <PostTemplate node={contentNode} />;
    // case 'product':
    //   return <ProductPage categorySlug={contentNode.slug} />;
    default:
      return (
        <main className='mt-60'>
          <p>{contentNode.contentTypeName} not implemented</p>
        </main>
      );
  }
}
