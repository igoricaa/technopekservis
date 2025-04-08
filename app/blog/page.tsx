import Breadcrumbs from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Post } from '@/gql/graphql';
import { getAllPostsQuery } from '@/queries/post-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import Image from 'next/image';
import Link from 'next/link';

const PostsPage = async () => {
  const postsData = await fetchGraphQL<{ posts: { nodes: Post[] } }>(
    print(getAllPostsQuery)
  );

  if (!postsData || !postsData.posts || postsData.posts.nodes.length === 0) {
    return <div>No posts found</div>;
  }

  const breadcrumbItems = [
    { label: 'Početna', href: '/' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <main className='py-18 sm:py-20 lg:py-28'>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='max-w-7xl mx-auto px-side pt-10 lg:pt-20'>
        <h1 className='text-5xl lg:text-6xl font-bold mb-6 sm:mb-10'>Blog</h1>
        <section className='grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4'>
          {postsData.posts.nodes.map((post, index) => (
            <PostCard
              key={`post-${index}`}
              postTitle={post.title || ''}
              postFeaturedImage={post.featuredImage?.node?.sourceUrl || ''}
              postExcerpt={post.excerpt || ''}
              postSlug={post.slug || ''}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default PostsPage;

const PostCard = ({
  postTitle,
  postFeaturedImage,
  postExcerpt,
  postSlug,
}: {
  postTitle: string;
  postFeaturedImage: string;
  postExcerpt: string;
  postSlug: string;
}) => {
  return (
    <Link
      href={`/blog/${postSlug}`}
      aria-label={`View details for ${postTitle}`}
      className='col-span-2 lg:col-span-3'
    >
      <article className='group px-4 py-6 shadow-md h-full flex flex-col'>
        <div className='overflow-hidden'>
          <Image
            src={postFeaturedImage}
            alt={postTitle}
            width={340}
            height={191}
            className='object-cover aspect-video group-hover:scale-110 transition-all duration-300'
          />
        </div>

        <h3 className='text-3xl font-bold mt-4'>{postTitle}</h3>
        <p
          className='text-sm text-gray-500 mt-3 line-clamp-2'
          dangerouslySetInnerHTML={{ __html: postExcerpt }}
        />

        <Button
          variant='textual'
          className='text-accent mt-auto grouped'
          aria-label={`Saznaj više o ${postTitle}`}
        >
          Saznajte više
        </Button>
      </article>
    </Link>
  );
};
