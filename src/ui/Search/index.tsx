import React, { FC, FormEvent } from 'react';
import { useLocale } from '../../modules/locale';
import { PrimaryButton } from '../Button';
import { Block } from '../Block';
import { Input } from '../Input';
import logo from '../../images/logo.png';
import styled from 'styled-components';

interface SearchProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Logo = styled.img`
  margin-right: 6px;
`;

export const Search: FC<SearchProps> = ({ onSubmit }) => {
  const { t } = useLocale();

  return (
    <Block as="form" onSubmit={onSubmit} flexDirection="row" p="12px" pb="0px">
      <Logo src={logo} alt={t('logo')} height="38px" width="38px" />
      <Input placeholder={t('search_placeholder')} name="search" flex={1} mr="6px"/>
      <PrimaryButton as="input" type="submit" value={t('search')} />
    </Block>
  );
};
