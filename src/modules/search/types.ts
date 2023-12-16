interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface SearchResult<Type> {
  search: {
    edges: [{ node: Type }];
    pageInfo: PageInfo;
  }
}

interface Language {
  name: string;
}

interface Owner {
  id: string;
  login: string
  avatarUrl: string;
}

export interface Repository {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  forkCount: number;
  stargazerCount: number;
  primaryLanguage: Language | null;
  owner: Owner;
}
