import React, { FC, FormEvent, Fragment, useState } from 'react';
import styled from 'styled-components';

import { collectFormData } from '../../utils/form';
import { Alert } from '../../ui/Alert';
import { Block } from '../../ui/Block';
import { Card } from '../../ui/Card';
import { Search as SearchBar } from '../../ui/Search';
import { Spinner } from '../../ui/Spinner';
import { useLocale } from '../locale';
import { Pagination } from '../../ui/Pagination';
import { type Repository } from './types';
import { usePaginatedQuery } from './hooks/usePaginatedQuery';
import { RepoDetails } from './components/RepoDetails';

interface SearchForm {
  search: string;
}

const CenteredElement = styled(Block)``;

CenteredElement.defaultProps = {
  maxWidth: '1000px',
  width: '100%',
};

const List = styled.ul`
  list-style: none;
  margin: 12px;
  padding: 0;
`;

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
    <Block height="100vh" overflow="hidden" alignItems="center">
      <CenteredElement>
        <SearchBar onSubmit={onSubmit} />
      </CenteredElement>
      <Block flex={1} overflow="auto" width="100%" alignItems="center">
        <CenteredElement>
          {loading ? (
            <Block p="12px" alignItems="center">
              {t('loading')}
              <Spinner />
            </Block>
          ) : error ? (
            <Alert m="12px">{t('loading_error')}: {'Unknown'}</Alert>
          ) : data?.search.edges.length ? (
            <List>
              {data?.search.edges.map(({ node }) => (
                <Card as="li" key={node.id} mb="6px">
                  <RepoDetails {...node} />
                </Card>
              ))}
            </List>
          ) : (
            <Fragment>{t('empty_results')}</Fragment>
          )}
        </CenteredElement>
      </Block>
      <Pagination
        nextControlDisabled={!data?.search.pageInfo.hasNextPage}
        prevControlDisabled={!data?.search.pageInfo.hasPreviousPage}
        onNextControlClick={requestNextPage}
        onPrevControlClick={requestPreviousPage}
      />
    </Block>
  );
};

export default Search;
