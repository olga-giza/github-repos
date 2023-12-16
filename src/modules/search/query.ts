import { gql } from '@apollo/client';

const RepositoryFragment = gql`
  fragment RepositoryFragment on Repository {
    id,
    url,
    name,
    createdAt,
    updatedAt
    forkCount,
    stargazerCount,
    primaryLanguage {
      name
    },
    owner {
      id,
      login,
      avatarUrl(size: 100)
    }
  } 
`;

const PageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor,
  }
`;

export const searchQuery = gql`
  ${PageInfoFragment}
  ${RepositoryFragment}

  query (
    $query: String!
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) { 
    search(
      type: REPOSITORY
      query: $query
      after: $after
      before: $before
      first: $first,
      last: $last,
    ) {
      edges {
        node {
          ... on Repository {
            ...RepositoryFragment
          }
        }
      },
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
