import React, { FC, FormEvent, Fragment, useState } from 'react';

import { type Repository } from './types';
import { useLocale } from '../locale';
import usePaginatedQuery from './hooks/usePaginatedQuery';
import { collectFormData } from '../../utils/form';

interface SearchForm {
  search: string;
}

const Search: FC = () => {
  const [query, setQuery] = useState<string>('');
  const { loading, error, data, requestNextPage, requestPreviousPage } = usePaginatedQuery<Repository>(query);
  const { t } = useLocale();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = collectFormData<SearchForm>(event.target as HTMLFormElement);

    setQuery(formData.search);
  };

  return (
    <ul>
      <form onSubmit={onSubmit}>
        <input name="search" />
        <input type="submit" value={t('search')} />
      </form>
      {loading ? (
        <Fragment>{t('loading')}</Fragment>
      ) : error ? (
        <Fragment>{t('loading_error')}: {error.message}</Fragment>
      ) : data?.search.edges.length ? (
        <Fragment>
          {data?.search.edges.map(({ node }) => <li key={node.id}>{node.name}</li>)}
        </Fragment>
      ) : (
        <Fragment>{t('empty_results')}</Fragment>
      )}
      {data?.search.pageInfo.hasNextPage && (
        <button disabled={!!error || loading} onClick={requestPreviousPage}>{t('prev_page')}</button>
      )}
      {data?.search.pageInfo.hasNextPage && (
        <button disabled={!!error || loading} onClick={requestNextPage}>{t('next_page')}</button>
      )}
    </ul>
  );
};

export default Search;
