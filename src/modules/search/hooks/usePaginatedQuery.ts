import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SearchResult } from '../types';
import { searchQuery } from '../query';

interface Cursor {
  after?: string;
  before?: string;
}

const usePaginatedQuery = <T, >() => {
  const query = 'is:public language:javascript sort:updatedAt';
  const first = 20;
  const [cursor, setCursor] = useState<Cursor>({});
  const variables = { query, first, ...cursor };
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

export default usePaginatedQuery;
