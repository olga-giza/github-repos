import React, { FC } from 'react';
import { useLocale } from '../../modules/locale';
import { Block } from '../Block';
import { SecondaryButton } from '../Button';
import styled from 'styled-components';

interface SearchProps {
  onPrevControlClick: () => void;
  onNextControlClick: () => void;
  prevControlDisabled: boolean;
  nextControlDisabled: boolean;
}

const Container = styled(Block)`
  box-shadow: 0px -1px 5px ${({ theme }) => theme.colors.neutral['30']};
`;

Container.defaultProps = {
  flexDirection: 'row',
  justifyContent: 'center',
  bg: 'neutral.10',
  width: '100%',
  pt: 's',
  px: 'xs',
  pb: 'l',
};

export const Pagination: FC<SearchProps> = ({
  onPrevControlClick,
  onNextControlClick,
  prevControlDisabled,
  nextControlDisabled,
}) => {
  const { t } = useLocale();

  return (
    <Container>
      <SecondaryButton disabled={prevControlDisabled} onClick={onPrevControlClick} mx="6px">
        {t('prev_page')}
      </SecondaryButton>
      <SecondaryButton disabled={nextControlDisabled} onClick={onNextControlClick} mx="6px">
        {t('next_page')}
      </SecondaryButton>
    </Container>
  );
};
