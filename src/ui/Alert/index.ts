import styled, { IStyledComponent } from 'styled-components';
import { Card, type CardProps } from '../Card';

export const Alert: IStyledComponent<'web', CardProps> = styled(Card)``;

Alert.defaultProps = {
  borderColor: 'error.50',
  color: 'neutral.10',
  bg: 'error.50',
};

