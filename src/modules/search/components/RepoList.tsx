import React, { FC } from 'react';
import styled from 'styled-components';

import { Card } from '../../../ui/Card';
import { type Repository } from '../types';
import { RepoDetails } from './RepoDetails';

interface RepoListProps {
  data: Array<{ node: Repository }>;
}

const List = styled.ul`
  margin: ${({ theme }) => theme.space.s};
  list-style: none;
  padding: 0;
`;

export const RepoList: FC<RepoListProps> = ({ data }) => (
  <List>
    {data.map(({ node }) => (
      <Card as="li" key={node.id} mb="xs">
        <RepoDetails {...node} />
      </Card>
    ))}
  </List>
);
