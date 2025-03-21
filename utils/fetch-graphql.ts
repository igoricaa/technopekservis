export async function fetchGraphQL<T = any>(
  query: string,
  variables?: { [key: string]: any },
  headers?: { [key: string]: string }
): Promise<T> {
  try {
    let authHeader = '';

    const body = JSON.stringify({
      query,
      variables: {
        ...variables,
      },
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader && { Authorization: authHeader }),
          ...headers,
        },
        body,
        cache: 'force-cache',
        next: {
          tags: ['wordpress'],
        },
      }
    );

    if (!response.ok) {
      console.error('Response Status:', response);
      throw new Error(response.statusText);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error('Error executing GraphQL query');
    }

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
