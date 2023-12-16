import React, { FC } from 'react';
import format from 'date-fns/format';
import { useLocale } from '../../locale';
import { Block } from '../../../ui/Block';
import { Text } from '../../../ui/Typography';
import { Link } from '../../../ui/Link';
import { Repository } from '../types';
import styled from 'styled-components';

const Avatar = styled.img`
  border-radius: 50%;
`;

const BoldText = styled(Text)``;

BoldText.defaultProps = {
  fontWeight: 700,
  ml: '6px',
};

export const RepoDetails: FC<Repository> = ({
  name,
  primaryLanguage,
  stargazerCount,
  forkCount,
  owner,
  url,
  createdAt,
  updatedAt,
}) => {
  const { t } = useLocale();

  return (
    <Block flexDirection={['column-reverse', 'row']} alignItems="center">
      <Block flex={1} alignItems={['center', 'flex-start']}>
        <Link href={url}>{name}</Link>
        <Text>
          {t('created_at')}:
          <BoldText>{format(new Date(createdAt), 'dd MMM yyyy')}</BoldText>
        </Text>
        <Text>
          {t('updated_at')}:
          <BoldText>{format(new Date(updatedAt), 'dd MMM yyyy')}</BoldText>
        </Text>
        <Text>
          {t('fork_count')}:
          <BoldText>{forkCount}</BoldText>
        </Text>
        <Text>
          {t('star_count')}:
          <BoldText>{stargazerCount}</BoldText>
        </Text>
        {primaryLanguage && (
          <Text>
            {t('primary_language')}:
            <BoldText>{primaryLanguage.name}</BoldText>
          </Text>
        )}
      </Block>
      <Block alignItems={['center', 'flex-end']}>
        <Avatar src={owner.avatarUrl} height="100" width="100" alt={owner.login}/>
        <Text>
          {t('by')}:
          <BoldText>{owner.login}</BoldText>
        </Text>
      </Block>
    </Block>
  );
};
