import Breadcrumbs from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Post } from '@/gql/graphql';
import { cn } from '@/lib/utils';
import {
  getAdjacentPostsQuery,
  getAllPostsQuery,
  getPostBySlugQuery,
} from '@/queries/post-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import Link from 'next/dist/client/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const postsData = await fetchGraphQL<{ posts: { nodes: Post[] } }>(
    print(getAllPostsQuery)
  );

  if (!postsData || !postsData.posts) {
    return [];
  }

  return postsData.posts.nodes.map((post) => ({
    slug: post.slug,
  }));
}

export interface PostData {
  post: Post;
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const postData = await fetchGraphQL<PostData>(print(getPostBySlugQuery), {
    slug,
  });

  if (!postData || !postData.post) {
    notFound();
  }

  const post: Post = postData.post;

  const breadcrumbItems = [
    { label: 'Početna', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title || '', href: `/blog/${post.slug}` },
  ];

  return (
    <main className='py-20 sm:py-24 lg:py-28'>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='max-w-7xl mx-auto px-side mt-10 sm:mt-16 lg:mt-20'>
        <div className='relative w-full aspect-video'>
          <Image
            src={post.featuredImage?.node.sourceUrl || ''}
            alt={post.title || ''}
            fill
            className='object-cover'
          />
        </div>
        <h1 className='text-5xl font-bold mt-10 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 lg:mb-10'>
          {post.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />

        <Suspense fallback={<AdjacentPostSkeleton />}>
          <AdjacentPosts
            currentPostDatabaseId={post.databaseId}
            date={post.date || ''}
          />
        </Suspense>
      </div>
    </main>
  );
};

export default BlogPostPage;

const AdjacentPosts = async ({
  date,
  currentPostDatabaseId,
}: {
  date: string;
  currentPostDatabaseId: number;
}) => {
  const adjacentPostsData = await fetchGraphQL<{
    previous: { nodes: Post[] };
    next: { nodes: Post[] };
  }>(print(getAdjacentPostsQuery), {
    date,
    notIn: [currentPostDatabaseId],
  });

  if (
    !adjacentPostsData ||
    (!adjacentPostsData.previous && !adjacentPostsData.next)
  ) {
    return null;
  }

  const { previous, next } = adjacentPostsData;

  const previousPost = previous?.nodes[0] ?? null;
  const nextPost = next?.nodes[0] ?? null;

  return (
    <section className='flex justify-between items-center gap-4 mt-10 sm:mt-16 lg:mt-20'>
      {previousPost && (
        <AdjacentPostCard
          postTitle={previousPost.title || ''}
          postFeaturedImage={previousPost.featuredImage?.node.sourceUrl || ''}
          postSlug={previousPost.slug || ''}
          direction='previous'
        />
      )}

      {nextPost && (
        <AdjacentPostCard
          postTitle={nextPost.title || ''}
          postFeaturedImage={nextPost.featuredImage?.node.sourceUrl || ''}
          postSlug={nextPost.slug || ''}
          direction='next'
          className='lg:ml-auto'
        />
      )}
    </section>
  );
};

const AdjacentPostCard = ({
  postTitle,
  postFeaturedImage,
  postSlug,
  direction,
  className,
}: {
  postTitle: string;
  postFeaturedImage: string;
  postSlug: string;
  direction: 'previous' | 'next';
  className?: string;
}) => {
  return (
    <article
      className={cn(
        'group px-2 py-4 shadow-md flex-1 md:flex-none',
        `${className}`
      )}
    >
      <Link href={`/blog/${postSlug}`}>
        <div className='relative md:w-xs aspect-video overflow-hidden'>
          <Image
            src={postFeaturedImage}
            alt={postTitle}
            fill
            className='object-cover group-hover:scale-110 transition-all duration-300'
          />
        </div>
        <h3 className='text-2xl font-bold mt-2'>{postTitle}</h3>
        <Button variant='textual' className='grouped'>
          Pročitaj više
        </Button>
      </Link>
    </article>
  );
};

const AdjacentPostSkeleton = () => {
  return (
    <section className='flex justify-between items-center gap-4 mt-10 sm:mt-16 lg:mt-20'>
      <article className='px-2 py-4 shadow-md flex-1 sm:flex-auto'>
        <div className='md:w-xs aspect-video shimmer'></div>
        <div className='mt-2 w-44 h-8 shimmer'></div>
        <div className='mt-2 w-32 h-9 shimmer'></div>
      </article>
      <article className='group px-2 py-4 shadow-md flex-1 sm:flex-auto'>
        <div className='md:w-xs aspect-video shimmer'></div>
        <div className='mt-2 w-44 h-8 shimmer'></div>
        <div className='mt-2 w-32 h-9 shimmer'></div>
      </article>
    </section>
  );
};
