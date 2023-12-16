import styled, { IStyledComponent } from 'styled-components';
import { border, BorderProps } from 'styled-system';
import { Block, type BlockProps } from '../Block';

export type CardProps = BlockProps & BorderProps;

export const Card: IStyledComponent<'web', CardProps> = styled(Block)`
  ${border};
`;

Card.defaultProps = {
  borderColor: 'neutral.30',
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 3,
  bg: 'neutral.10',
  color: 'neutral.70',
  p: 12,
};

