// import { print } from 'graphql/language/printer';
// import { ContentNode, Post } from '@/gql/graphql';
// import { fetchGraphQL } from '@/utils/fetch-graphql';
// import { getPostByIdQuery } from '@/queries/post-queries';

// interface TemplateProps {
//   node: ContentNode;
// }

// export default async function PostTemplate({ node }: TemplateProps) {
//   const { post } = await fetchGraphQL<{ post: Post }>(
//     print(getPostByIdQuery),
//     {
//       id: node.databaseId,
//     }
//   );

//   return (
//     <div className='max-w-5xl mx-auto p-8'>
//       <h1 className='text-center'>{post.title}</h1>
//       <div className='text-center text-gray-500 m-8'>
//         By {post.author?.node.name}
//       </div>

//       <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
//     </div>
//   );
// }
