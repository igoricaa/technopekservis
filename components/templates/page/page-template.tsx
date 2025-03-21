import { print } from 'graphql/language/printer';
import { ContentNode, Page } from '@/gql/graphql';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { getPageByIdQuery } from '@/queries/page-queries';

interface TemplateProps {
  node: ContentNode;
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(getPageByIdQuery), {
    id: node.databaseId,
  });

  return <div dangerouslySetInnerHTML={{ __html: page?.content || '' }} />;
}
