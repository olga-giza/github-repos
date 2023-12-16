import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { searchQuery } from '../query';
import { type SearchResult } from '../types';

interface Cursor {
  after?: string;
  before?: string;
}

const PAGE_SIZE = 20;

export const usePaginatedQuery = <T, >(queryText: string) => {
  const query = `is:public language:javascript sort:updatedAt ${queryText}`;
  const [cursor, setCursor] = useState<Cursor>({});
  const variables = { query, first: PAGE_SIZE, ...cursor };
  const result = useQuery<SearchResult<T>>(searchQuery, { variables });

  const requestNextPage = () => {
    if (result.data) {
      setCursor({ after: result.data.search.pageInfo.endCursor });
    }
  };

  const requestPreviousPage = () => {
    if (result.data) {
      setCursor({ before: result.data.search.pageInfo.startCursor });
    }
  };

  return { ...result, requestNextPage, requestPreviousPage };
};
