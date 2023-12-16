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
    $first: Int!
    $query: String!
    $after: String
  ) { 
    search(
      type: REPOSITORY,
      query: $query,
      after: $after
      first: $first,
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
