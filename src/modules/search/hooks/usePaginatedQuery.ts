import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { searchQuery } from '../query';
import { type SearchResult } from '../types';

interface Cursor {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

const PAGE_SIZE = 20;

export const usePaginatedQuery = <T, >(queryText: string) => {
  const query = `is:public sort:updatedAt ${queryText}`;
  const [cursor, setCursor] = useState<Cursor>({ first: PAGE_SIZE });
  const variables = { query, ...cursor };
  const result = useQuery<SearchResult<T>>(searchQuery, { variables });

  const requestNextPage = () => {
    if (result.data) {
      setCursor({ after: result.data.search.pageInfo.endCursor, first: PAGE_SIZE });
    }
  };

  const requestPreviousPage = () => {
    if (result.data) {
      setCursor({ before: result.data.search.pageInfo.startCursor, last: PAGE_SIZE });
    }
  };

  return { ...result, requestNextPage, requestPreviousPage };
};
