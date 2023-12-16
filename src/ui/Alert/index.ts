import styled, { IStyledComponent } from 'styled-components';
import { Card, type CardProps } from '../Card';

export const Error: IStyledComponent<'web', CardProps> = styled(Card)``;

Error.defaultProps = {
  borderColor: 'error.50',
  color: 'neutral.10',
  bg: 'error.50',
  m: 'm',
};

export const Warning: IStyledComponent<'web', CardProps> = styled(Error)``;

Warning.defaultProps = {
  borderColor: 'warning.50',
  bg: 'warning.50',
};

