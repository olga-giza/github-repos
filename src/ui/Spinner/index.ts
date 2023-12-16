import styled, { IStyledComponent, keyframes } from 'styled-components';
import { border, BorderProps } from 'styled-system';
import { Block, type BlockProps } from '../Block';

type SpinnerProps = Omit<BlockProps, 'children'> & BorderProps & {
  duration?: number;
};

const spinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner: IStyledComponent<'web', SpinnerProps> = styled(Block)`
  ${border};
  border-radius: 50%;
  animation: ${spinnerAnimation} ${(p) => (p.duration ? `${p.duration}ms` : '800ms')} linear infinite;
`;

Spinner.defaultProps = {
  borderColor: 'neutral.30',
  borderTopColor: 'primary.50',
  borderStyle: 'solid',
  borderWidth: 4,
  height: 40,
  width: 40,
};

