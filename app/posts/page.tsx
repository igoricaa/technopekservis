import { Post } from '@/gql/graphql';
import { getAllPostsQuery } from '@/queries/post-queries';

import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';

const PostsPage = async () => {
  const postsData = await fetchGraphQL<{ posts: { nodes: Post[] } }>(
    print(getAllPostsQuery)
  );

  console.log(postsData);

  if (!postsData || !postsData.posts || postsData.posts.nodes.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <main>
      PostsPage
      {/* <PostTemplate node={posts} /> */}
      {postsData.posts.nodes.map((post) => (
        <div key={post.id}>
          <div>{post.title}</div>
          <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
      ))}
    </main>
  );
};

export default PostsPage;
